import "./SerClaimStatic.css";
import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";

const COLORS = ['rgba(255, 99, 132, 0.7)', 'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(201, 203, 207, 0.7)', 'rgba(255, 159, 64, 0.7)', 'rgba(75, 192, 192, 0.7)'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
export default function App() {

    const [claimDetails, setAllClaimdetails] = useState([]);
    useEffect(() => {
        function getAllClaimDetails() {
            axios
                .get("http://localhost:8070/SerClaim/service/get-count")
                .then(res => {
                    setAllClaimdetails(res.data)
                })
                .catch(() => {
                    alert("Check The Connectivity");
                });
        }

        getAllClaimDetails()
    }, []);

    return (
        <><PieChart width={400} height={400}>
            <Pie
                data={claimDetails}
                cx={186}
                cy={180}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={140}
                fill='#ff6384'
                dataKey="Count"
            >
                {claimDetails.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
            <div class="legend"><i class="fas fa-circle text-info"></i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(255, 99, 132, 0.7)" class="bi bi-circle-fill" viewBox="0 0 19 21">
                <circle cx="8" cy="8" r="8" />
            </svg>Apple <i class="fas fa-circle text-danger">
                </i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(75, 192, 192, 0.7)" class="bi bi-circle-fill" viewBox="0 0 19 21">
                    <circle cx="8" cy="8" r="8" />
                </svg>Samsung <i class="fas fa-circle text-warning"></i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(153, 102, 255, 0.7)" class="bi bi-circle-fill" viewBox="0 0 19 21">
                    <circle cx="8" cy="8" r="8" />
                </svg>Htc<i class="fas fa-circle text-info"></i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgba(201, 203, 207, 0.7)" class="bi bi-circle-fill" viewBox="0 0 19 21">
                    <circle cx="8" cy="8" r="8" />
                </svg>Huawei
            </div></>
    );
}