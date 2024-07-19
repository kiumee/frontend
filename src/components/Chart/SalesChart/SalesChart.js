import React, { useState } from "react";
import {
    FormControl,
    InputLabel, MenuItem, Select,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    YAxis,
    XAxis,
    Tooltip
} from "recharts";
// styles
import useStyles from "./styles";
// components
import Widget from "../../Widget";
// import PageTitle from "../../PageTitle";
import { Typography } from "../../Wrappers";
import Dot from "../../Sidebar/components/Dot";

const yearChartData = [
    {
        year: 2023,
        monthlySales:{
            "1월" : 330000,
            "2월" : 350000,
            "3월" : 370000,
            "4월" : 390000,
            "5월" : 410000,
            "6월" : 430000,
            "7월" : 450000,
            "8월" : 470000,
            "9월" : 490000,
            "10월" : 510000,
            "11월" : 550000,
            "12월" : 600000,
        }
    },
    {
        year: 2024,
        monthlySales:{
            "1월" : 330000,
            "2월" : 340000,
            "3월" : 200000,
            "4월" : 360000,
            "5월" : 370000,
            "6월" : 380000,
            "7월" : 390000,
            "8월" : 300000,
            "9월" : 410000,
            "10월" : 420000,
            "11월" : 100000,
            "12월" : 440000,
        }
    },
    {
        year: 2025,
        monthlySales:{
            "1월" : 330000,
            "2월" : 1200000,
            "3월" : 350000,
            "4월" : 360000,
            "5월" : 370000,
            "6월" : 300000,
            "7월" : 390000,
            "8월" : 400000,
            "9월" : 410000,
            "10월" : 420000,
            "11월" : 800000,
            "12월" : 440000,
        }
    }
]
const SalesChart = () => {
    var classes = useStyles();
    var theme = useTheme();

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [salesChartData, setSalesChartData] = useState(getChartDataForYear(selectedYear));

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        setSalesChartData(getChartDataForYear(event.target.value));
    };
    return (
        <Widget
            bodyClass={classes.mainChartBody}
            header={
                <div className={classes.mainChartHeader}>
                    <Typography
                        variant="h5"
                        color="text"
                        colorBrightness="secondary"
                    >
                        판매매출
                    </Typography>
                    <div className={classes.mainChartHeaderLabels}>
                        <div className={classes.mainChartHeaderLabel}>
                            <Dot color="warning" />
                            <Typography className={classes.mainChartLegentElement}>
                                매출
                            </Typography>
                        </div>
                    </div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="year-select-label">년도</InputLabel>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            value={selectedYear}
                            onChange={handleYearChange}
                        >
                            {yearChartData.map((yearData) => (
                                <MenuItem key={yearData.year} value={yearData.year}>{yearData.year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            }
        >
            <ResponsiveContainer width="100%" minWidth={500} height={150} style={{
                // padding: "10px"
            }}>
                <ComposedChart
                    margin={{ top: 0, right: 15, left: 15, bottom: 0 }}
                    data={salesChartData}
                >
                    <YAxis tickFormatter={(value) => `${value}원`} padding={{ top: 20, bottom: 20 }}/>
                    <XAxis dataKey="month" padding={{ left: 20, right: 20 }}/>
                    <Line
                        type="linear"
                        dataKey="sales"
                        stroke={theme.palette.warning.main}
                        strokeWidth={3}
                        dot={{
                            stroke: theme.palette.warning.dark,
                            strokeWidth: 2,
                            fill: theme.palette.warning.main,
                        }}
                    />
                    {/* Tooltip 컴포넌트 추가 */}
                    <Tooltip
                        // cursor={{ strokeDasharray: '3 3' }}
                        content={<CustomTooltip />}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </Widget>
    );
};

// tooltip 커스텀
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <p>{`${label}`}</p>
                <p>매출액 :<span style={{ color: '#e15252' }}>{` ${payload[0].value} 원`}</span></p>
            </div>
        );
    }
    return null;
};

// 데이터 변환함수
const getChartDataForYear = (year) => {
    const yearData = yearChartData.find(y => y.year === year);
    return Object.keys(yearData.monthlySales).map(month => ({
        month,
        sales: yearData.monthlySales[month],
    }));
};

export default SalesChart;