import "./SerClaimStatic.css";
import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Brush,
    AreaChart,
    Area
} from "recharts";
import axios from "axios";

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
        <div>
            <AreaChart
                width={376}
                height={428}
                data={claimDetails}
                syncId="anyId"
                margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 8
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Count" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
        </div>
    );
}
