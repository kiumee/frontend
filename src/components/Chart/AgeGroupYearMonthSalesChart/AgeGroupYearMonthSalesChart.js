import React, { useState } from "react";
import {
    FormControl,
    InputLabel, MenuItem, Select,
} from "@material-ui/core";
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

const ageGroupYearMonthChartData = [
    {
        year: 2023,
        monthlySales:{
            "1월" : {
                "10대~20대":150000,
                "30대~40대":70000,
                "50대~60대":80000,
                "70대~":50000,
            },
            "2월" : {
                "10대~20대":120000,
                "30대~40대":70000,
                "50대~60대":85000,
                "70대~":55000,
            },
            "3월" : {
                "10대~20대":110000,
                "30대~40대":70000,
                "50대~60대":85000,
                "70대~":55000,
            },
            "4월" : {
                "10대~20대":150000,
                "30대~40대":80000,
                "50대~60대":85000,
                "70대~":55000,
            },
            "5월" : {
                "10대~20대":130000,
                "30대~40대":80000,
                "50대~60대":90000,
                "70대~":60000,
            },
            "6월" : {
                "10대~20대":120000,
                "30대~40대":80000,
                "50대~60대":90000,
                "70대~":60000,
            },
            "7월" : {
                "10대~20대":150000,
                "30대~40대":80000,
                "50대~60대":90000,
                "70대~":60000,
            },
            "8월" : {
                "10대~20대":140000,
                "30대~40대":80000,
                "50대~60대":100000,
                "70대~":70000,
            },
            "9월" : {
                "10대~20대":100000,
                "30대~40대":120000,
                "50대~60대":100000,
                "70대~":70000,
            },
            "10월" : {
                "10대~20대":300000,
                "30대~40대":140000,
                "50대~60대":100000,
                "70대~":70000,
            },
            "11월" : {
                "10대~20대":210000,
                "30대~40대":140000,
                "50대~60대":120000,
                "70대~":70000,
            },
            "12월" : {
                "10대~20대":215000,
                "30대~40대":145000,
                "50대~60대":115000,
                "70대~":95000,
            },
        }
    },
    {
        year: 2024,
        monthlySales:{
            "1월" : {
                "10대~20대":150000,
                "30대~40대":70000,
                "50대~60대":80000,
                "70대~":50000,
            },
            "2월" : {
                "10대~20대":150000,
                "30대~40대":70000,
                "50대~60대":85000,
                "70대~":55000,
            },
            "3월" : {
                "10대~20대":160000,
                "30대~40대":70000,
                "50대~60대":85000,
                "70대~":55000,
            },
            "4월" : {
                "10대~20대":160000,
                "30대~40대":80000,
                "50대~60대":85000,
                "70대~":55000,
            },
            "5월" : {
                "10대~20대":160000,
                "30대~40대":80000,
                "50대~60대":90000,
                "70대~":60000,
            },
            "6월" : {
                "10대~20대":180000,
                "30대~40대":80000,
                "50대~60대":90000,
                "70대~":60000,
            },
            "7월" : {
                "10대~20대":200000,
                "30대~40대":80000,
                "50대~60대":90000,
                "70대~":60000,
            },
            "8월" : {
                "10대~20대":200000,
                "30대~40대":80000,
                "50대~60대":100000,
                "70대~":70000,
            },
            "9월" : {
                "10대~20대":200000,
                "30대~40대":120000,
                "50대~60대":100000,
                "70대~":70000,
            },
            "10월" : {
                "10대~20대":200000,
                "30대~40대":140000,
                "50대~60대":100000,
                "70대~":70000,
            },
            "11월" : {
                "10대~20대":210000,
                "30대~40대":140000,
                "50대~60대":110000,
                "70대~":70000,
            },
            "12월" : {
                "10대~20대":215000,
                "30대~40대":145000,
                "50대~60대":115000,
                "70대~":75000,
            },
        }
    }
]
const AgeGroupYearMonthSalesChart = () => {
    var classes = useStyles();

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
                        나이대별 매출
                    </Typography>
                    <div className={classes.mainChartHeaderLabels}>
                        <div className={classes.mainChartHeaderLabel}>
                            <Dot color="success"/>
                            <Typography className={classes.mainChartLegentElement}>
                                10대 ~ 20대
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.mainChartHeaderLabels}>
                        <div className={classes.mainChartHeaderLabel}>
                            <Dot color="warning"/>
                            <Typography className={classes.mainChartLegentElement}>
                                30대 ~ 40대
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.mainChartHeaderLabels}>
                        <div className={classes.mainChartHeaderLabel}>
                            <Dot color="primary"/>
                            <Typography className={classes.mainChartLegentElement}>
                                50대 ~ 60대
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.mainChartHeaderLabels}>
                        <div className={classes.mainChartHeaderLabel}>
                            <Dot color="secondary"/>
                            <Typography className={classes.mainChartLegentElement}>
                                70대
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
                            {ageGroupYearMonthChartData.map((yearData) => (
                                <MenuItem key={yearData.year} value={yearData.year}>{yearData.year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            }
        >
            {/*<ResponsiveContainer width="100%" minWidth={500} height={350} style={{*/}
            {/*    padding: "10px"*/}
            {/*}}>*/}
            {/*    <ComposedChart*/}
            {/*        margin={{top: 0, right: 15, left: 15, bottom: 0}}*/}
            {/*        data={salesChartData}*/}
            {/*    >*/}
            {/*        <YAxis tickFormatter={(value) => `${value}원`} padding={{top: 20, bottom: 20}}/>*/}
            {/*        <XAxis dataKey="month" padding={{left: 20, right: 20}}/>*/}
            {/*        <Line*/}
            {/*            type="linear"*/}
            {/*            dataKey="sales"*/}
            {/*            stroke={theme.palette.warning.main}*/}
            {/*            strokeWidth={3}*/}
            {/*            dot={{*/}
            {/*                stroke: theme.palette.warning.dark,*/}
            {/*                strokeWidth: 2,*/}
            {/*                fill: theme.palette.warning.main,*/}
            {/*            }}*/}
            {/*        />*/}
            {/*        /!* Tooltip 컴포넌트 추가 *!/*/}
            {/*        <Tooltip*/}
            {/*            // cursor={{ strokeDasharray: '3 3' }}*/}
            {/*            content={<CustomTooltip />}*/}
            {/*        />*/}
            {/*    </ComposedChart>*/}
            {/*</ResponsiveContainer>*/}
            <ResponsiveContainer width="100%" minWidth={500} height={350} style={{padding: "10px"}}>
                <ComposedChart
                    margin={{ top: 0, right: 15, left: 15, bottom: 0 }}
                    data={salesChartData}
                >
                    <YAxis tickFormatter={(value) => `${value}원`} padding={{top: 20, bottom: 20}}/>
                    <XAxis dataKey="month" padding={{left: 20, right: 20}}/>
                    <Tooltip content={<CustomTooltip />} />

                    {/* 각 연령대별 선 그래프 추가 */}
                    <Line type="monotone" dataKey="10대~20대" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="30대~40대" stroke="#8884d8" />
                    <Line type="monotone" dataKey="50대~60대" stroke="#ffc658" />
                    <Line type="monotone" dataKey="70대~" stroke="#ff7300" />

                    {/* 다른 필요한 차트 구성요소들 (예: <CartesianGrid /> 등) */}
                </ComposedChart>
            </ResponsiveContainer>
        </Widget>
    );
};

// tooltip 커스텀
// const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//         return (
//             <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
//                 <p>{`${label}`}</p>
//                 <p>매출액 :<span style={{ color: '#e15252' }}>{` ${payload[0].value} 원`}</span></p>
//             </div>
//         );
//     }
//     return null;
// };
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <p>{`${label}`}</p>
                {payload.map((entry) => (
                    <p key={entry.name}>
                        {`${entry.name} : `}
                        <span style={{ color: entry.color }}>{`${entry.value} 원`}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// 데이터 변환함수
const getChartDataForYear = (year) => {
    const yearData = ageGroupYearMonthChartData.find(y => y.year === year);
    return Object.keys(yearData.monthlySales).map(month => ({
        month,
        ...yearData.monthlySales[month], // Spread 연산자를 사용해 각 연령대별 매출액을 추가합니다.
    }));
};

export default AgeGroupYearMonthSalesChart;