import React, { Component, useEffect, useState } from 'react';
import StudentService from '../services/StudentService';






class ListOrders extends Component {
      constructor(props)
      {
          super(props)
          this.state={
                students:[] 
          }

          this.addStudent=this.addStudent.bind(this);
          this.editStudent=this.editStudent.bind(this);
          this.deleteStudent=this.deleteStudent.bind(this);
          this.viewStudent=this.viewStudent.bind(this);
      }
    
     componentDidMount() {
         StudentService.getOrders().then((res) => {
             this.setState({students:res.data});
         });
     }
     
     addStudent()
     {
        
        this.props.history.push('/add-student');
     }

     editStudent(id)
     {
        this.props.history.push(`/update-student/${id}`);
        
     }

     deleteStudent(id)
     {
        this.props.history.push(`/delete-student/${id}`);
        // StudentService.deleteStudent(id).then(res => {
        //     this.setState({
        //          student: this.state.students.filter(student => student.id !== id)
        //     })
        // })
        
     }

     viewStudent(id)
     {
        this.props.history.push(`/view-student/${id}`);
        
     }

    render() {
        return (
            <div>
                <h2 className="text-center">Order inventory</h2>
                <div> 
                    <button className="btn btn-primary" onClick={this.addStudent}> Place an order</button>
                </div>
                <br/>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Addres </th>
                                <th>Method</th>
                                <th>Order</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.students.map(
                                     student =>
                                     <tr key={student.id}>
                                         <td>{student.name}</td>
                                         <td>{student.address}</td>
                                         <td>{student.method}</td>
                                         <td>{student.selection}</td>
                                         <td>{student.quantity}</td>
                                         <td>${student.total}</td>
                                         <td>
                                         <button onClick={() =>this.editStudent(student.id)}  className="btn btn-primary">Update</button>
                                         {" "} 
                                            <button onClick={() =>this.deleteStudent(student.id)} className="btn btn-danger">Delete</button> 
                                            {" "}
                                            <button onClick={() =>this.viewStudent(student.id)} className="btn btn-primary">View</button> 
                                            {"  "}
                                         </td>
                                     </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default ListOrders