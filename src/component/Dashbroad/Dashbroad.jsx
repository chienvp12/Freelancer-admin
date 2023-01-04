import React, { useState, useEffect } from 'react'
import API from '../../apiConfig/fetchApi';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { Progress } from 'antd';
import { ArrowRightOutlined, BorderOutlined, InfoCircleOutlined } from '@ant-design/icons';

// Get date now - 30 ngay 
const startDate = new Date(new Date().getTime() - ((24 * 60 * 60 * 1000) * 29)).toLocaleDateString().split('/').reverse().join('-');
const endDate = new Date(new Date().getTime()).toLocaleDateString().split('/').reverse().join('-');

function Dashbroad() {
  const [statusAcount, setStatusAccount] = useState([]);
  const [statusJob, setStatusJob] = useState([]);
  const [freelancer, setFreelancer] = useState([]);
  const [account, setAccount] = useState([]);
  const [job, setJob] = useState([]);
  const [sactitiscal, setSactitiscal] = useState([]);
  const [testAPI, setTestAPI] = useState([]);
  const fetchApi = async () => {
    const resAccountStatus = await API.requestGetAPI('statistic/account');
    const resJobStatus = await API.requestGetAPI('statistic/job');
    const resFeelancer = await API.requestGetAPI('freelancer?currentPage=1&pageSize=999999');
    const resJob = await API.requestGetAPI('job?currentPage=1&pageSize=5');
    const resAccount = await API.requestGetAPI('account?currentPage=1&pageSize=5&typeUser=1');
    const resSactitiscal = await API.requestGetAPI(`statistic/financial?startDate=${startDate}&endDate=${endDate}`);

      // TODO : promisee ALL
    setStatusAccount(resAccountStatus.data);
    setStatusJob(resJobStatus.data);
    setFreelancer(resFeelancer.data.list);
    setAccount(resAccount.data.list);
    setJob(resJob.data.list);
    setSactitiscal(resSactitiscal.data);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const dataChart = {
    labels: sactitiscal.map((item, index) => {
      const [date, values] = item;
      return (date.split('/').join('-'))
    }),

    datasets: [{
      label: 'Revenue',
      data: sactitiscal.map((item, index) => {
        const [date, values] = item;
        return (values);
      }),

      fill: false,
      borderColor: '#fd7e14',
      borderWidth: 1
    }]
  }
  const totalUser = statusAcount.totalFreelancer + statusAcount.totalUserNormal;
  return (
    <div className="dashboard-container">
      <div className="content-left">

        <div className="user-statistic">
          <div className="user">
            <div className="financial-chart" style={{ height: '97%' }}>
              <div className="progress-chart">
                <div className="title-chart">
                  <h6 style={{ fontSize: '1rem' }}>User statistics</h6>
                  <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>User statistics on the system</p>
                </div>
                <div>
                  <h4>{totalUser}</h4>
                  <Progress
                    strokeWidth={15}
                    strokeLinecap="butt"
                    percent={statusAcount.totalUserNormal * 100 / totalUser}
                    trailColor='#fd7e14'
                    showInfo={false}
                  />
                </div>
                <div className="user-final">
                  <div className="normal-user">
                    <span><BorderOutlined style={{ backgroundColor: '#007bff', color: '#007bff', borderRadius: '5px', marginRight: '5px' }} />Normal user</span>
                    <span>{statusAcount.totalUserNormal} accounts</span>
                  </div>
                  <div className="normal-user">
                    <span><BorderOutlined style={{ backgroundColor: '#fd7e14', color: '#fd7e14', borderRadius: '5px', marginRight: '5px' }} />Freelancer</span>
                    <span>{statusAcount.totalFreelancer} accounts</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <div className="list-user">
            <div className="financial-chart">
              <div className="chart-header">
                <div className="title-chart">
                  <h6 style={{ fontSize: '1rem' }}>User</h6>
                  <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>List new user</p>
                </div>

                <div className="seedetails">
                  <p><Link to={'/user'}>See details <ArrowRightOutlined /></Link></p>
                </div>
              </div>
              {account.map((item, index) => {
                return (
                  <div key={index} style={{ borderBottom: '1px solid rgba(34,34,48,.2)', display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
                    <div className="right-item">
                      <div className="username">
                        {item.username}
                      </div>
                      <div className="createAt">
                        <span style={{ color: '#808080', fontWeight: '500' }}>CreateAt: </span>
                        {item.createdAt.slice(0, 10).split('-').reverse().join('/')}
                      </div>
                    </div>
                    <Link to={'/user'}><InfoCircleOutlined /></Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="financial-chart">
          <div className="chart-header">
            <div className="title-chart">
              <h6 style={{ fontSize: '1rem' }}>Financial chart</h6>
              <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Revenue in the last 30 days</p>
            </div>

            <div className="seedetails">
              <p><Link to={'/statistical'}>See details <ArrowRightOutlined /></Link></p>
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
      <div className="content-right">
        <div className="overview">
          <h5 style={{textAlign: 'center'}}>Overview</h5>
          <div className="job-overview">
            <div className="row">
              <div className="col">
                <p>{statusJob.totalJob}</p>
                <p>Total Job</p>
              </div>
              <div className="col">
                <p>{statusJob.totalJobClosed}</p>
                <p>Job closed</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>{statusJob.totalJobDoing}</p>
                <p>Total doing</p>
              </div>
              <div className="col">
                <p>{statusJob.totalJobDone}</p>
                <p>Job done</p>
              </div>
            </div>
          </div>
        </div>
        <div className="freelancer-language">
          
        </div>
        <div className="job-overview">
          <div className="list-user-overview">
            
              <div className="chart-header">
                <div className="title-chart">
                  <h6 style={{ fontSize: '1rem' }}>Job</h6>
                  <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>List new job</p>
                </div>

                <div className="seedetails">
                  <p><Link to={'/job'}>See details <ArrowRightOutlined /></Link></p>
                </div>
              </div>
              {job.map((item, index) => {
                return (
                  <div key={index} style={{ borderBottom: '1px solid rgba(34,34,48,.2)', display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
                    <div className="right-item">
                      <div className="username">
                        {item.subject}
                      </div>
                      <div className="createAt">
                        <span style={{ color: '#808080', fontWeight: '500' }}>CreateAt: </span>
                        {item.created_at.slice(0, 10).split('-').reverse().join('/')}
                      </div>
                    </div>
                    <Link to={'/job'}><InfoCircleOutlined /></Link>
                  </div>
                )
              })}
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashbroad