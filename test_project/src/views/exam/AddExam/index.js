import React,{Component} from 'react'
import { Form, Input, Select,  Button, InputNumber, DatePicker } from 'antd';
import styles from "./style.less"
import {withRouter} from "react-router-dom";
import {connect} from 'dva'

@withRouter
@Form.create()
class AddExam extends Component {
    state = {
        startValue: null,
        endValue: null,
        endOpen: false
    };
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    
      disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
          return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
      }
    
      onChange = (field, value) => {                                   
        this.setState({
          [field]: value,
        });
      }
    onStartChange = (value) => {
        this.onChange('startValue', value);
      }
    
      onEndChange = (value) => {
        this.onChange('endValue', value);
      }
    handleStartOpenChange = (open) => {
        if (!open) {
          this.setState({ endOpen: true });
        }
      }
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
     
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            // console.log(values)
            const newVal=Object.assign({}, values, {
                number: values.number*1,
                end_time: +values.end_time,
                start_time: +values.start_time
            })
            this.props.AddTest(newVal)
            this.props.history.push('/home/edit')
        }
      });
    }
    handleChange=(value)=> {
        // console.log(`selected ${value}`);
    }
    classChange=(value)=>{
        // console.log(`selected ${value}`);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        // const { startValue, endValue} = this.state;  
        return (
            <div>
                <div>
                    <h2 className={styles.head}>添加考试</h2>
                </div>
                <div className={styles.content}>
                <Form className={styles.form} onSubmit={this.handleSubmit}>
                <Form.Item 
                label="试卷名称" 
                help="The information is being validated..."
                validateStatus = '试卷名称'>
                    {getFieldDecorator('title', {
                        rules: [{
                        required: true, message: '请输入试卷名称!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    validateStatus = '选择考试类型'
                    label="选择考试类型"
                    help="The information is being validated..."
                    >
                    {getFieldDecorator('exam_id', {
                        rules: [{
                        required: true, message: '请选择考试类型!',
                        }],
                    })(
                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                        {
                            this.props.examType.map((item,index) => {
                                return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option> 
                            }) 
                        }    
                        </Select>
                    )} 
                </Form.Item>
                <Form.Item
                    validateStatus = '选择课程'
                    help="The information is being validated..."
                    label="选择课程"
                    >
                    {getFieldDecorator('subject_id', {
                        rules: [{
                        required: true, message: '请选择课程!',
                        }],
                    })(
                        <Select style={{ width: 120 }} onChange={this.classChange}>
                        {
                            this.props.classType.map((item,index) => {
                                return <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option> 
                            }) 
                        }
                        </Select>
                    )} 
                </Form.Item>
                <Form.Item
                    validateStatus = '设置题量'
                    help="The information is being validated..."
                    label="设置题量"
                    >
                    {getFieldDecorator('number', {
                        rules: [{
                        required: true, message: '请设置题量!',
                        }],
                    })(
                        <InputNumber min={3} max={10}  />
                    )} 
                </Form.Item>
                <Form.Item
                    validateStatus = '考试时间'
                    help="The information is being validated..."
                    label="考试时间"
                    >
                    <div className={styles.pickers}>
                        {getFieldDecorator('start_time', {
                        rules: [{
                         required: true,
                         message: '请选择时间!',
                        }],
                    })(<DatePicker
                        className={styles.picker}
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        // value={startValue}
                        placeholder="开始时间"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                    />)}
                        <span className={styles.pickerCenter}>-</span>
                        {getFieldDecorator('end_time', {
                        rules: [{
                         required: true,
                         message: '请选择结束时间!',
                        }],
                    })(<DatePicker
                        
                        className={styles.picker}
                        disabledDate={this.disabledEndDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        // value={endValue}
                        placeholder="结束时间"
                        onChange={this.onEndChange}
                        onOpenChange={this.handleEndOpenChange}
                    />)}
                    </div> 
                </Form.Item>
                <Button type="primary" htmlType="submit">创建试卷</Button>
                </Form>
                </div> 
            </div>
        );
    }           
    componentDidMount(){
        this.props.getAllType()      
    }
}

const mapStateToProps=(state)=>{
    return {
        ...state.index,
        ...state.getExam
    }
    
}
const mapDispatchToProps = dispatch => {
    return {
      getAllType() {
        dispatch({
          type:'index/getAllType'
        })
      },
      AddTest(options) {
        dispatch({
          type:'getExam/AddTest',
          options
        })
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddExam);