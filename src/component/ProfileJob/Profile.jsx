import React, { useState, useEffect } from 'react';
import { Form, Tag, Rate, Space, Spin } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import API from '../../apiConfig/fetchApi';
import Jobdone from '../Jobdone/Jobdone';



const Profile = (props) => {
  const [idProfile, setIdProfile] = useState([])
  const [loading, setLoading] = useState(false);
  const fetchApi = async () => {
    setLoading(true)
    const res = await API.requestGetAPI(`job/getJobDoneByFreelancerId?freelancerId=${props.id}`)
    setIdProfile(res.data)
    setLoading(false)
  }
  useEffect(() => {
    fetchApi();

  }, []);
  return (
    <Spin size="large" spinning={loading}>
      <Form>
        <Form.Item>
          <div className="header-profile">
            <img src={props?.thumbnail} alt="" className='profile-img' />
            <div className="profile">
              <h1>{props?.name}</h1>
              <div className="location">
                <EnvironmentOutlined />
                {props?.address}
              </div>
              <Rate className='rate-freelancer' disabled allowHalf defaultValue={props?.rate} />
            </div>
          </div>
        </Form.Item>
        <Form.Item >
          <div className='content-profile'>
            <div className="fullname">
              <span className='label-content'>Fullname: </span>
              <span>{props?.name}</span>
            </div>
            <div className="gender">
              <span className='label-content'>Gender: </span>
              <span> {props?.gender}</span>
            </div>
          </div>

        </Form.Item>
        <Form.Item>
          <div className='content-profile'>
            <div className="fullname">
              <span className='label-content'>Phone: </span>
              <span>{props?.phone}</span>
            </div>
            <div className="gender">
              <span className='label-content'>Experience: </span>
              <span> {props?.experience}</span>
            </div>
          </div>

        </Form.Item>
        <Form.Item>
          <div className="description">
            <span className='label-content'>
              Description:
              <div dangerouslySetInnerHTML={{ __html: props?.description }}></div>
            </span>

            <div className="gender">
              <span className='label-content'>Average income: </span>
              <span> {props?.averageIncome}</span>
            </div>
          </div>

        </Form.Item>
        <Form.Item>
          <div className='content-profile'>
            <div className="fullname">
              <span className='label-content'>Total job success: </span>
              <span>{props?.totalJobDone}</span>
            </div>
            <div className="gender">
              <span className='label-content'>Total income: </span>
              <span> {props?.totalEarning}</span>
            </div>
          </div>

        </Form.Item>
        <Form.Item>
          <span className='language label-content'>
            Language: {props?.language.split(',').map((language) => {

              return (
                <Tag color='blue' key={language}>
                  {language.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        </Form.Item>
        <Jobdone {...props} />
      </Form>
    </Spin>
  )
}

export default Profile