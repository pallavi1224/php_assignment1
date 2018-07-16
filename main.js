var obj_fn;
var sal_obj_fn;
var obj_design_data;

$(document).ready(function () {
    get_data();
    get_sal_data();
    get_design_data();
});

var table;

function get_data() {
    $.ajax({
        url: 'paginantion.php',
        type: 'POST',
        success: function (res) {
            obj_fn = JSON.parse(res);
            if ((obj_fn.aaData.length) > 0) {
                $("#print_data").css('display', '');
                $('#example').css('display', '');
                $('#records_table').html('');
                $('#example').DataTable().destroy();
                table = $('#example').DataTable({
                    data: obj_fn.aaData,
                    columns: [
                        {
                            "data": 'seq'
                            },
                        {
                            "data": 'f_name'
                            },
                        {
                            "data": 'l_name'
                            },
                        {
                            "data": 'mobile'
                            },
                        {
                            "data": 'email'
                            },
                        {
                            "data": 'profile',
                            'render': function (data, type, full, meta) {
                                var res = `<img height='50px' width='50px' src=${data}>`;
                                return res;
                            }
                        },
                        {
                            "data": 'desig_name'
                        },
                        {
                            "data": 'id',
                            'render': function (data, type, full, meta) {
                                var res = `<button type='button' class='btn btn-warning' 
                                    onclick='update_data(" ${data} ")'>Update</button>`;
                                return res;
                            }
                    },
                        {
                            "data": 'id',
                            'render': function (data, type, full, meta) {
                                var res = `<button type='button' class='btn btn-danger' 
                                    onclick='delete_data(" ${data} ")'>Delete</button>`;
                                return res;
                            }
                     }
                     ]
                })
            } else {
                $('#toggle_drop').css('display', 'none');
                $('#print_data').css('display', 'none');
                $('#example').css('display', 'none');
                $('#example').DataTable().destroy();
                $("#records_table").html('<h5>No records found</h5>');
            }
        }
    })
}

function get_sal_data() {
    $.ajax({
        url: 'sal_paginantion.php',
        type: 'POST',
        success: function (res) {
            sal_obj_fn = JSON.parse(res);
            if ((sal_obj_fn['aaData'].length) > 0) {
                $("#print_data_sal").css('display', '');
                $('#example_sal').css('display', '');
                $('#sal_table').html('');
                $('#example_sal').DataTable().destroy();
                var table = $('#example_sal').DataTable({
                    data: sal_obj_fn['aaData'],
                    columns: [
                        {
                            "data": 'seq'
                            },
                        {
                            "data": 'f_name'
                            },
                        {
                            "data": 'l_name'
                            },
                        {
                            "data": 'mobile'
                        },
                        {
                            "data": 'email'
                            },
                        {
                            "data": 'amount',
                            "render": function (data, type, row) {
                                var tempNumber = parseFloat(data.trim()).toFixed(2);
                                if (isNaN(tempNumber)) {
                                    return "";
                                } else {
                                    var sArray = ("" + tempNumber).split('.');
                                    return sArray[0].split(/(?=(?:.{3})+$)/).join(",") + "." + sArray[1] + '  ' + "&#8377;";
                                }
                            }
                        },
                        {
                            "data": 'desig_name'
                        },
                        {
                            "data": 'sal_id',
                            'render': function (data, type, full, meta) {
                                var res = `<button type='button' class='btn btn-danger' 
                                  onclick='delete_sal_data(" ${data} ")'>Delete</button>`;
                                return res;
                            }
                       }
                     ]

                })
            } else {
                $('#toggle_drop_sal').css('display', 'none');
                $('#print_data_sal').css('display', 'none');
                $('#example_sal').css('display', 'none');
                $('#example_sal').DataTable().destroy();
                $("#sal_table").html('<h5>No records found</h5>');
            }
        }
    })
}

$("#form_data").submit(function (e) {
    e.preventDefault();
    var f_name = $('#f_name').val();
    var l_name = $('#l_name').val();
    var email = $('#email').val();
    var mobile = $('#mobile').val();
    var file = $('#file').val();
    var filter = /^[a-zA-Z0-9#.,;:'()\/&\-"!]+( [a-zA-Z0-9#.,;:'()\/&\-"!]+)*$/;
    if (f_name == '') {
        $('#f_name').focus();
        $.alert({
            title: 'Message!',
            content: 'Please Enter First Name!',
        });
        return;
    } else if (l_name == '') {
        $('#l_name').focus();
        $.alert({
            title: 'Message!',
            content: 'Please Enter Last Name!',
        });
        return;
    } else if (email == '') {
        $('#email').focus();
        $.alert({
            title: 'Message!',
            content: 'Please Enter Email!',
        });
        return;
    } else if (filter.test(email)) {
        $('#email').focus();
        $.alert({
            title: 'Message!',
            content: 'Enter the Valid email Address!',
        });
        return;
    } else if (!$('#mobile').val().match('[0-9]{10}')) {
        $('#mobile').focus();
        $.alert({
            title: 'Message!',
            content: 'Please enter 10 digit numbers only!',
        });
        return;
    } else if (file == '') {
        $('#file').focus();
        $.alert({
            title: 'Message!',
            content: 'Please attach the file!',
        });
        return;
    }
    var formData = new FormData(this);
    $.ajax({
        url: 'add.php',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            var data = JSON.parse(result);
            get_data();
            if (data.success === 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record Added successfully!',
                });
            } else if (data.error === 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record Not Added!',
                });
            }
        }
    });
})

function update_data(id) {
    $('#myModal').modal('show');
    $('#info_id').val(id);
    $.ajax({
        url: 'per_person.php',
        data: 'id=' + id,
        method: 'POST',
        success: function (result) {
            var data = JSON.parse(result);
            $('#info_id').val(data.id);
            $('#fname').val(data.f_name);
            $('#lname').val(data.l_name);
            $('#eemail').val(data.email);
            $('#m_mobile').val(data.mobile);
        }
    });
}

function delete_data(id) {
    $('#myModal1').modal('show');
    $('#info_id1').val(id);
}

function update_info() {
    var id = $('#info_id').val();
    var f_name = $('#fname').val();
    var l_name = $('#lname').val();
    var email = $('#eemail').val();
    var mobile = $('#m_mobile').val();
    var filter = /^[a-zA-Z0-9#.,;:'()\/&\-"!]+( [a-zA-Z0-9#.,;:'()\/&\-"!]+)*$/;
    if (f_name == '') {
        $('#fname').focus();
        $.alert({
            title: 'Message!',
            content: 'Please Enter First Name!',
        });
        return;
    } else if (l_name == '') {
        $('#lname').focus();
        $.alert({
            title: 'Message!',
            content: 'Please Enter Last Name!',
        });
        return;
    } else if (email == '') {
        $('#eemail').focus();
        $.alert({
            title: 'Message!',
            content: 'Please Enter Email!',
        });
        return;
    } else if (filter.test(email)) {
        $('#m_mobile').focus();
        $.alert({
            title: 'Message!',
            content: 'Enter the correct email Address!',
        });
        return;
    }
    $.ajax({
        url: 'update_person.php',
        data: 'id=' + id + '&f_name=' + f_name + '&l_name=' + l_name + '&email=' + email + '&mobile=' + mobile,
        method: 'POST',
        success: function (result) {
            var data = JSON.parse(result);
            get_data();
            if (data.success === 1) {
                $('#myModal').modal('hide');
                $.alert({
                    title: 'Message!',
                    content: 'Record Updated Successfully!',
                });
            } else if (data.error === 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record Not Updated!',
                });
            }
        }
    });
}

function delete_info() {
    var id = $('#info_id1').val();
    $.ajax({
        url: 'delete_person.php',
        data: 'id=' + id,
        method: 'POST',
        success: function (result) {
            var data = JSON.parse(result);
            get_data();
            if (data.success == 1) {
                $('#myModal1').modal('hide');
                $.alert({
                    title: 'Message!',
                    content: 'Record deleted Successfully!',
                });
            } else if (data.error == 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record Not Deleted!',
                });
            }
        }
    });
}

function pdf_data() {
    var data = obj_fn['aaData'];
    var trHTML = `<table id='example' class='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                            <tbody>`;
    $.each(data, function (i, item) {
        trHTML += `<tr>
                                  <td> ${(i + 1)} </td>
                                   <td> ${data[i].f_name} </td>
                                   <td> ${data[i].l_name} </td> 
                                   <td> ${data[i].email} </td>
                               </tr>`;
    });
    trHTML += "</tbody></table>";
    $('#down_pdf').append(trHTML);
    var url = 'http://server/folder/file.ext';
    var myWindow = window.open("url", "Download", "width=1000,height=1000");
    myWindow.document.write(trHTML);
    myWindow.print();
}

function excel_data() {
    var date = new Date();
    var for_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    var data = obj_fn['aaData'];
    var trHTML = `<table id='example' class='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                            <tbody>`;
    $.each(data, function (i, item) {
        trHTML += `<tr>
                                  <td> ${(i + 1)} </td>
                                   <td> ${data[i].f_name} </td>
                                   <td> ${data[i].l_name} </td> 
                                   <td> ${data[i].email} </td>
                               </tr>`;
    });
    trHTML += "</tbody></table>";
    $('#down_pdf').html(trHTML);
    var link = document.createElement('a');
    link.id = 'LinkDownloadExcel';
    link.href = 'data:application/vnd.ms-excel,' + encodeURIComponent($('#down_pdf').html());
    link.download = 'basic_info_' + for_date + '.xls';
    document.body.appendChild(link);
    link.click();
}

function add_salary() {
    var salary = $('#salary').val();
    var info_id = $("#info_sal_id option").filter(":selected").val();
    var design_id = $('#design_sal_drop2 option').filter(':selected').val();
    if (design_id == '') {
        $('#design_sal_drop2').focus();
        $.alert({
            title: 'Message!',
            content: 'Please Select Designation!',
        });
        return;
    } else if (isNaN(salary)) {
        $('#salary').focus();
        $.alert({
            title: 'Message!',
            content: 'Please enter digits only!',
        });
        return;
    } else if (info_id == '') {
        $('#info_sal_id').focus();
        $.alert({
            title: 'Message!',
            content: 'Please Select Employee!',
        });
        return;
    }
    $.ajax({
        url: 'post_sal.php',
        data: 'salary=' + salary + '&info_id=' + info_id + '&design_id=' + design_id,
        method: 'POST',
        success: function (result) {
            var data = JSON.parse(result);
            get_sal_data();
            if (data.success == 2) {
                $.alert({
                    title: 'Message!',
                    content: 'Alredy Exist want to add delete the first!',
                });
            } else if (data.success == 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record Added Successfully!',
                });
            } else if (data.error == 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record Not Added!',
                });
            }
        }
    });
}

function delete_sal_data(id) {
    $('#myModal2').modal('show');
    $('#sal_id1').val(id);
}

function delete_sal_info() {
    var id = $('#sal_id1').val();
    $.ajax({
        url: 'delete_sal_person.php',
        data: 'id=' + id,
        method: 'POST',
        success: function (result) {
            var data = JSON.parse(result);
            get_sal_data();
            if (data.success == 1) {
                $('#myModal2').modal('hide');
                $.alert({
                    title: 'Message!',
                    content: 'Record deleted Successfully!',
                });
            } else if (data.error == 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record Not Deleted !',
                });
            }
        }
    });
}

function pdf_sal_data() {
    var data = sal_obj_fn['aaData'];
    var trHTML = `<table id='example' class='table table-striped table-bordered'>
                               <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Salary</th>
                                   </tr>
                               </thead>
                               <tbody>`;
    $.each(data, function (i, item) {
        trHTML += `<tr>
                    <td> ${(i + 1)} </td>
                    <td> ${data[i].f_name} </td>
                    <td> ${data[i].l_name} </td>
                    <td> ${data[i].email} </td>
                    <td> ${data[i].amount} </td>
                    </tr>`;
    });
    trHTML += "</tbody></table>";
    $('#print_sal').append(trHTML);
    var myWindow = window.open("url", "Download", "width=1000,height=1000");
    myWindow.document.write(trHTML);
    myWindow.print();
}

function excel_sal_data() {
    var date = new Date();
    var for_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    var data = sal_obj_fn['aaData'];
    var trHTML = `<table id='example' class='table table-striped table-bordered'>
                               <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Salary</th>
                                   </tr>
                               </thead>
                               <tbody>`;
    $.each(data, function (i, item) {
        trHTML += `<tr>
                                    <td> ${(i + 1)} </td>
                                    <td> ${data[i].f_name} </td>
                                    <td> ${data[i].l_name} </td>
                                    <td> ${data[i].email} </td>
                                    <td> ${data[i].amount} </td>
                                </tr>`;
    });
    trHTML += "</tbody></table>";
    $('#print_sal').html(trHTML);
    var link = document.createElement('a');
    link.id = 'LinkDownloadExcel';
    link.href = 'data:application/vnd.ms-excel,' + encodeURIComponent($('#print_sal').html());
    link.download = 'salary_info_' + for_date + '.xls';
    document.body.appendChild(link);
    link.click();

}

$("#myform").submit(function (e) {
    e.preventDefault();
    var form = document.myform;
    var dataString = $(form).serialize();
    $.ajax({
        url: 'send_message.php',
        type: 'POST',
        data: dataString,
        success: function (result) {
            $('#myResponse').html(result);
        }
    });
})

function logout() {
    $.ajax({
        url: 'logout.php',
        method: 'POST',
        success: function () {
            window.location = "index.html";
        }
    })
}
//////////////////// Desination Crud Operations/////

//Add Designation//
$("#form_desi").submit(function (e) {
    e.preventDefault();
    var desig_name = $('#desig_name').val();
    if (desig_name == '') {
        $('#desig_name').focus();
        $.alert({
            title: 'Message!',
            content: 'Please Enter Designation Name !',
        });
        return;
    }
    var formData = new FormData(this);
    $.ajax({
        url: 'add_desig.php',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            var data = JSON.parse(result);
            get_design_data();
            if (data.success === 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record added Added !',
                });
            } else if (data.error === 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record Not Added!',
                });
            }
        }
    });
})

//Get Desination Data
function get_design_data() {
    $.ajax({
        url: 'get_design.php',
        type: 'POST',
        success: function (res) {
            obj_design_data = JSON.parse(res);
            if ((obj_design_data['aaData'].length) > 0) {
                design_dropdwn();
                $("#print_design_icon").css('display', '');
                $('#tbl_design').DataTable().destroy();
                var table = $('#tbl_design').DataTable({
                    data: obj_design_data['aaData'],
                    columns: [
                        {
                            "data": 'seq'
                            },
                        {
                            "data": 'desig_name'
                            },
                        {
                            "data": 'desig_desc'
                        },
                        {
                            "data": 'desig_id',
                            'render': function (data, type, full, meta) {
                                var res = `<button type='button' class='btn btn-danger' 
                                  onclick='delete_design_data(" ${data} ")'>Delete</button>`;
                                return res;
                            }
                       }
                     ]
                })
            } else {
                $.alert({
                    title: 'Message!',
                    content: 'Adding the designation visit add designation !',
                });
            }
        }
    })
}

//Add Data To Model
function delete_design_data(id) {
    $('#delete_design').modal('show');
    $('#desig_id').val(id);
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

//Delete Designation 
function delete_design() {
    var desig_id = $('#desig_id').val();
    var check_data = obj_fn['aaData'];
    $.ajax({
        url: 'delete_design.php',
        data: 'desig_id=' + desig_id,
        method: 'POST',
        success: function (result) {
            var data = JSON.parse(result);
            get_design_data();
            $('#delete_design').modal('hide');
            if (data.success == 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record deleted Successfully!',
                });
            } else if (data.error == 1) {
                $.alert({
                    title: 'Message!',
                    content: 'Record Not Deleted beacase it is mapped with other data!',
                });
            }
        }
    });
}


//Dropdown for designation
function design_dropdwn() {
    var obj_data = obj_design_data['aaData'];
    $("#design_sal_drop,#design_sal_drop1,#design_sal_drop2,#design_sal_drop3,#design_sal_drop4").empty();
    $("#design_sal_drop,#design_sal_drop1,#design_sal_drop2,#design_sal_drop3,#design_sal_drop4").append("<option value=''>Select Designation</option>");
    $.each(obj_data, function (i, value) {
        $("#design_sal_drop,#design_sal_drop1,#design_sal_drop2,#design_sal_drop3,#design_sal_drop4").append("<option value='" + obj_data[i].desig_id + "'>" + obj_data[i].desig_name + "</option>");
        $('#design_sal_drop,#design_sal_drop1,#design_sal_drop2,#design_sal_drop3,#design_sal_drop4').select2({});
    })
}

//get data by designation
function report_by_design() {
    var design_id = $("#design_sal_drop1 option").filter(":selected").val();
    $.ajax({
        url: 'report_design.php',
        type: 'POST',
        data: 'design_id=' + design_id,
        success: function (res) {
            obj_fn = JSON.parse(res);
            if ((obj_fn.aaData.length) > 0) {
                $("#print_data").css('display', '');
                $('#example').css('display', '');
                $('#records_table').html('');
                $('#example').DataTable().destroy();
                var table = $('#example').DataTable({
                    data: obj_fn.aaData,
                    columns: [
                        {
                            "data": 'seq'
                            },
                        {
                            "data": 'f_name'
                            },
                        {
                            "data": 'l_name'
                            },
                        {
                            "data": 'mobile'
                            },
                        {
                            "data": 'email'
                            },
                        {
                            "data": 'profile',
                            'render': function (data, type, full, meta) {
                                var res = `<img height='50px' width='50px' src=${data}>`;
                                return res;
                            }
                        },
                        {
                            "data": 'desig_name'
                        },
                        {
                            "data": 'id',
                            'render': function (data, type, full, meta) {
                                var res = `<button type='button' class='btn btn-warning' 
                                    onclick='update_data(" ${data} ")'>Update</button>`;
                                return res;
                            }
                    },
                        {
                            "data": 'id',
                            'render': function (data, type, full, meta) {
                                var res = `<button type='button' class='btn btn-danger' 
                                    onclick='delete_data(" ${data} ")'>Delete</button>`;
                                return res;
                            }
                     }
                     ]
                })
            } else {
                $('#print_data').css('display', 'none');
                $('#example').css('display', 'none');
                $('#example').DataTable().destroy();
                $("#records_table").html('<h5>No records found</h5>');
            }
        }
    })
}

//hide and show the info form depend upon the dropdown
function display_form() {
    var drop = $('#design_sal_drop option').filter(":selected").val();
    if (drop == '') {
        $('#design_sal_drop').focus();
        $('#info_form_show').css('display', 'none');
        $.alert({
            title: 'Message!',
            content: 'Please Select one designation to fill the information !',
        });
    } else {
        $('#info_form_show').css('display', '');
    }
}

//hide and show the salary form depend upon the dropdown
function show_sal_form() {
    var drop = $('#design_sal_drop2 option').filter(":selected").val();
    if (drop == '') {
        $('#design_sal_drop2').focus();
        $('#sal_form_show').css('display', 'none');
        $.alert({
            title: 'Message!',
            content: 'Please Select one designation to fill the information!',
        });
    } else {
        $('#sal_form_show').css('display', '');
    }
    $.ajax({
        url: 'report_design.php',
        type: 'POST',
        data: 'design_id=' + drop,
        success: function (res) {
            var obj_fn_desi = JSON.parse(res);
            var obj_data = obj_fn_desi['aaData'];
            $("#info_sal_id").empty();
            $("#info_sal_id").append("<option value=''>Select Employee</option>");
            $.each(obj_data, function (i, value) {
                $("#info_sal_id").append("<option value='" + obj_data[i].id + "'>" + obj_data[i].f_name + "</option>");
                $('#info_sal_id').select2({});
            })
        }
    })
}

function report_by_salary() {
    var design_id = $("#design_sal_drop3 option").filter(":selected").val();
    $.ajax({
        url: 'report_sal_design.php',
        type: 'POST',
        data: 'design_id=' + design_id,
        success: function (res) {
            sal_obj_fn = JSON.parse(res);
            if ((sal_obj_fn.aaData.length) > 0) {
                $("#print_data_sal").css('display', '');
                $('#example_sal').css('display', '');
                $('#sal_table').html('');
                $('#example_sal').DataTable().destroy();
                var table = $('#example_sal').DataTable({
                    data: sal_obj_fn.aaData,
                    columns: [
                        {
                            "data": 'seq'
                            },
                        {
                            "data": 'f_name'
                            },
                        {
                            "data": 'l_name'
                            },
                        {
                            "data": 'mobile'
                            },
                        {
                            "data": 'email'
                            },
                        {
                            "data": 'amount',
                            "render": function (data, type, row) {
                                var tempNumber = parseFloat(data.trim()).toFixed(2);
                                if (isNaN(tempNumber)) {
                                    return "";
                                } else {
                                    var sArray = ("" + tempNumber).split('.');
                                    return sArray[0].split(/(?=(?:.{3})+$)/).join(",") + "." + sArray[1] + '  ' + "&#8377;";
                                }
                            }
                        },
                        {
                            "data": 'desig_name'
                        },
                        {
                            "data": 'sal_id',
                            'render': function (data, type, full, meta) {
                                var res = `<button type='button' class='btn btn-danger' 
                                    onclick='delete_data(" ${data} ")'>Delete</button>`;
                                return res;
                            }
                     }
                     ]
                })
            } else {
                $('#print_data_sal').css('display', 'none');
                $('#example_sal').css('display', 'none');
                $('#example_sal').DataTable().destroy();
                $("#sal_table").html('<h5>No records found</h5>');
            }
        }
    })
}

function message_by_design() {
    var drop = $('#design_sal_drop4 option').filter(":selected").val();
    if (drop == '') {
        $('#design_sal_drop4').focus();
        $.alert({
            title: 'Message!',
            content: 'Please Select one designation to fill the information!',
        });
        return;
    }
    $.ajax({
        url: 'report_design.php',
        type: 'POST',
        data: 'design_id=' + drop,
        success: function (res) {
            var obj_fn_desi = JSON.parse(res);
            var obj_data = obj_fn_desi['aaData'];
            trHTML = `<ul class="list-group list-group-flush">`;
            $.each(obj_data, function (i, item) {
                trHTML += `<li class='list-group-item'>
                            <input class='form-check-input' type='checkbox' name='check_arr[]' value='${obj_data[i].mobile}'>
                                <label class='form-check-label'>
                                    ${obj_data[i].f_name} ${obj_data[i].mobile}
                                </label>
                          </li>`;
            });
            trHTML += '</ul>'
            $('#mySelect').html(trHTML);
        }
    })
}
