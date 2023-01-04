
import React, {useState, useEffect} from 'react';
import Chart, { scales } from 'chart.js/auto';

import  Report  from "./report.png";
import { Button, DatePicker, Form, TimePicker } from 'antd';
import API from '../../apiConfig/fetchApi';
import { Line } from 'react-chartjs-2';
const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
}
function Statistical() {
  const [jobStatus, setJobStatus] = useState([]);
  const fetchApi = async (startDate, endDate) =>{
      const resJob = await API.requestGetAPI(`statistic/financial?startDate=${startDate}&endDate=${endDate}`)
      setJobStatus(resJob.data);
      
  }
  const onFinish =  (fieldsValue) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue['dateTime'];

    const values = {
      'dateTime': [
        rangeValue[0].format('YYYY-MM-DD'),
        rangeValue[1].format('YYYY-MM-DD'),
      ],
    };
    const [startDate, endDate] = values.dateTime;
     fetchApi(startDate,endDate);
  };
  const dataChart = {
    labels: jobStatus.map((item, index) => {
      const [date, values] = item;
      return (date.split('/').join('-'))
    }),

    datasets: [{
      label: 'Revenue',
      data: jobStatus.map((item, index) => {
        const [date, values] = item;
        return (values)
      }),

      fill: false,
      borderColor: '#fd7e14',
      borderWidth: 1
    }]
  }
  return (
    <div className="header-search">
      <Form name="time_related_controls" onFinish={onFinish}>
      <Form.Item name="dateTime" {...rangeConfig}>
        <RangePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
    <div className="financial-chart">
          <div className="chart-header">
            <div className="title-chart">
              <h6 style={{ fontSize: '1rem' }}>Financial chart</h6>
              <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Revenue in the last 30 days</p>
            </div>
          </div>

          <Line data={dataChart} options={{
            scales: {
              y: {
                min: 0,
              }
            }
          }}

          />
        </div>  
    </div>
    
  );
}

export default Statistical