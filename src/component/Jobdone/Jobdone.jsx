import { Form, Rate, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import API from '../../apiConfig/fetchApi'

function Jobdone(props) {
    const [idProfile, setIdProfile] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchApi = async () => {
        setLoading(true);
        const res = await API.requestGetAPI(`job/getJobDoneByFreelancerId?freelancerId=${props.id}`)
        setIdProfile(res.data)
    }
    useEffect(() => {
        fetchApi();
        setLoading(false)
    }, []);
    return (

        <Spin spinning={loading} size='large'>
            {idProfile.map((profileID, index) => {
                return (

                    <Form.Item key={index}>
                        <div style={{ borderBottom: '1px solid rgb(212, 212, 212)' }}>
                            <div className="mb-1">
                                <span style={{ color: 'blue', fontWeight: '500', lineHeight: '1.2' }}>
                                    {profileID.subject}
                                </span>
                                {" - "}
                                <small style={{ fontSize: '80%' }}>
                                    {profileID.salary}$
                                </small>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Rate disabled allowHalf defaultValue={profileID.rate} />
                                <i>{profileID.comment}</i>
                            </div>
                        </div>
                    </Form.Item>

                )
            })
            }
        </Spin>
    )
}

export default Jobdone