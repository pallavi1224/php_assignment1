var obj_fn;
var sal_obj_fn;

$(document).ready(function () {
    get_data();
    get_sal_data();
    get_dropdown();
    set_all_checkbox();
});

function format(d) {
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Full name:</td>' +
        '<td>' + d.f_name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Last Name</td>' +
        '<td>' + d.l_name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Email ID</td>' +
        '<td>' + d.email + '</td>' +
        '</tr>' +
        '</table>';
}

var table;
function get_data() {
    $.ajax({
        url: 'paginantion.php',
        type: 'POST',
        success: function (res) {
            obj_fn = JSON.parse(res);
            if ((obj_fn.aaData.length) > 0) {
                $("#print_data").css('display', '');
                $('#example').DataTable().destroy();
                table = $('#example').DataTable({
                    data: obj_fn.aaData,
                    columns: [
                        {
                            "class": "details-control",
                            "orderable": false,
                            "data": null,
                            "defaultContent": ""
                        },
                        {
                            "data": 'id'
                            },
                        {
                            "data": 'f_name'
                            },
                        {
                            "data": 'l_name'
                            },
                        {
                            "data": 'email'
                            },
                        {
                            "data": 'profile',
                            'render': function (data, type, full, meta) {
                                var res = `<img height='50' width='50' src='${data}'>`;
                                return res;
                            }
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
                $("#records_table").html('<h3>No records found</h3>');
            }
        }
    })
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

}

function get_sal_data() {
    $.ajax({
        url: 'sal_paginantion.php',
        type: 'POST',
        success: function (res) {
            sal_obj_fn = JSON.parse(res);
            if ((sal_obj_fn['aaData'].length) > 0) {
                $("#print_data_sal").css('display', '');
                $('#example_sal').DataTable().destroy();
                var table = $('#example_sal').DataTable({
                    data: sal_obj_fn['aaData'],
                    columns: [
                        {
                            "data": 'info_id'
                            },
                        {
                            "data": 'f_name'
                            },
                        {
                            "data": 'l_name'
                            },
                        {
                            "data": 'email'
                            },
                        {
                            "data": 'amount',
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
                $("#sal_table").html('<h3>No Records Found</h3>');
            }
        }
    })
}

function get_dropdown() {
    $.ajax({
        url: 'get_dropdown.php',
        method: 'POST',
        success: function (result) {
            $('#info_sal_id').append(result);
            $('#info_sal_id').select2({});
        }
    });
}

$("#form_data").submit(function (e) {
    e.preventDefault();
    var f_name = $('#f_name').val();
    var l_name = $('#l_name').val();
    var email = $('#email').val();
    var filter = /^[a-zA-Z0-9#.,;:'()\/&\-"!]+( [a-zA-Z0-9#.,;:'()\/&\-"!]+)*$/;
    if (f_name == '') {
        alert("Please Enter First Name");
        return;
    } else if (l_name == '') {
        alert("Please Enter Last Name");
        return;
    } else if (email == '') {
        alert("Please Enter Email");
        return;
    } else if (filter.test(email)) {
        alert("enter the correct email Address");
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
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                            Record added Added </div>`);
            } else if (data.error === 1) {
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                            Record Not Added </div>`);
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
            console.log(data);
            $('#info_id').val(data.id);
            $('#fname').val(data.f_name);
            $('#lname').val(data.l_name);
            $('#eemail').val(data.email);
        }
    });
}

var delete_data = (id) => {
    $('#myModal1').modal('show');
    $('#info_id1').val(id);
}

function update_info() {
    var id = $('#info_id').val();
    var f_name = $('#fname').val();
    var l_name = $('#lname').val();
    var email = $('#eemail').val();
    $.ajax({
        url: 'update_person.php',
        data: 'id=' + id + '&f_name=' + f_name + '&l_name=' + l_name + '&email=' + email,
        method: 'POST',
        success: function (result) {
            var data = JSON.parse(result);
            get_data();
            if (data.success === 1) {
                $('#myModal').modal('hide');
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                        Record Updated Successfully</div>`);
            } else if (data.error === 1) {
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                        Record Not Updated </div>`);
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
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                             Record deleted Successfully</div>`);
            } else if (data.error == 1) {
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                             Record Not Deleted </div>`);
            }
        }
    });
}

var pdf_data = () => {
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

var excel_data = () => {
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
    if (salary == '') {
        alert("Please Enter Salary");
        return;
    }
    $.ajax({
        url: 'post_sal.php',
        data: 'salary=' + salary + '&info_id=' + info_id,
        method: 'POST',
        success: function (result) {
            var data = JSON.parse(result);
            get_sal_data();
            if (data.success == 2) {
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                         Alredy Exist want to add delete the first</div>`);
            } else if (data.success == 1) {
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                            Record Added Successfully</div>`);
            } else if (data.error == 1) {
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                            Record Not Added </div>`);
            }
        }
    });
}

var delete_sal_data = (id) => {
    $('#myModal2').modal('show');
    $('#sal_id1').val(id);
}

var delete_sal_info = () => {
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
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                                Record deleted Successfully</div>`);
            } else if (data.error == 1) {
                $('#result').html(`<div class='alert alert-primary' role='alert'>
                                                Record Not Deleted </div>`);
            }
        }
    });
}

var pdf_sal_data = () => {
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

var excel_sal_data = () => {
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

function set_all_checkbox() {
    $.ajax({
        url: 'select_check.php',
        method: 'POST',
        success: function (result) {
            var data = JSON.parse(result);
            trHTML = `<ul class="list-group list-group-flush">`;
            $.each(data, function (i, item) {
                trHTML += `<li class='list-group-item'>
                            <input class='form-check-input' type='checkbox' name='check_arr[]' value='${data[i].id}'>
                                <label class='form-check-label'>
                                    ${data[i].f_name}
                                </label>
                          </li>`;
            });
            trHTML += '</ul>'
            $('#mySelect').html(trHTML);
        }
    })
}

$("#myform").submit(function (e) {
    e.preventDefault();
    var form = document.myform;
    var dataString = $(form).serialize();
    alert(dataString);
    $.ajax({
        url: 'send_message.php',
        type: 'POST',
        data: dataString,
        success: function (result) {
            $('#myResponse').html(result);
        }
    });
})

var logout = () => {
    $.ajax({
        url: 'logout.php',
        method: 'POST',
        success: function () {
            window.location = "index.html";
        }
    })
}
