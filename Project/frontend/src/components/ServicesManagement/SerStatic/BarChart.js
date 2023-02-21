import "./SerClaimStatic.css";
import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend
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
    }, [])

    return (
        <BarChart

            width={390}
            height={428}
            title="NO of Mobiles"
            data={claimDetails}
            margin={{
                top: 20,
                right: 1,
                left: 1,
                bottom: 8
            }}
        >
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend></Legend>
            <Bar dataKey="Count" fill="rgba(255, 206, 86, 20)" />
        </BarChart>

    );
}
