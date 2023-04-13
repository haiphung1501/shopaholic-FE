import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Box } from '@mui/material';
import { Chart } from 'chart.js';

const LineChart = () => {
    const orders = useSelector(state => state.orders.orders.orders);

    // Filter orders to only include those within the last 30 days
    const filteredOrders = orders.filter(order =>
        moment(order.createdAt).isBetween(moment().subtract(30, 'days'), moment(), 'day', '[]')
    );

    // Group orders by day
    const ordersByDay = filteredOrders.reduce((acc, order) => {
        const day = moment.utc(order.createAt).local().format('YYYY-MM-DD');
        console.log('ngaay', day)
        acc[day] = acc[day] ? acc[day] + 1 : 1;
        return acc;
    }, {});
    // Create arrays of data for the chart
    const labels = [];
    const data = [];
    for (let i = 0; i < 30; i++) {
        const day = moment().subtract(i, 'days').format('YYYY-MM-DD');
        labels.unshift(moment(day).format('MMM D'));
        data.unshift(ordersByDay[day] || 0);
    }
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Orders',
                data,
                fill: false,
                backgroundColor: 'rgb(0, 123, 255)',
                borderColor: 'rgba(0, 123, 255, 0.5)',
            },
        ],
    };

    return (
        <Box sx={{ height: 400 }}>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </Box>
    );
};

export default React.memo(LineChart);
