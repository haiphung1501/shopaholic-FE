import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function DoughnutChart() {
    const { products, loading } = useSelector((state) => state.product);
    const data = {
        labels: ['In Stock', 'Out of Stock'],
        datasets: [
            {
                label: '# of Votes',
                data: [
                    products.filter((product) => product.stock > 0).length,
                    products.filter((product) => product.stock === 0).length,
                ],
                backgroundColor: [
                    'rgba(54, 162, 235)',
                    'rgba(255, 99, 132)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 0.5,
            },
        ],
    };
    if (loading) return <CircularProgress />;
    return <Doughnut data={data} />;
}
