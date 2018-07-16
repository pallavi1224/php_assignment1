<?php 
session_start();
if(!isset($_SESSION['admin_id'])){
    header('location:index.html');
}
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
    <link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css">

    <title>Task!</title>
    <style>
        td.details-control {
            background: url('https://datatables.net/examples/resources/details_open.png') no-repeat center center;
            cursor: pointer;
        }

        tr.details td.details-control {
            background: url('https://datatables.net/examples/resources/details_close.png') no-repeat center center;
        }

        .select2-container .select2-selection--single {
            height: 38px !important;
        }

        .select2-container--default .select2-selection--single {
            border: 1px solid #ced4da !important;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="text-right m-2">
            <h3>
                <?php echo $_SESSION['admin_name']; ?> <i class="fas fa-sign-out-alt" onclick="logout()"></i></h3>
        </div>
        <div class="m-4 p-1">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home">Add Employee Details</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile">Add Salary Details</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact">Send Notification</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-designation">Add Designation</a>
                </li>
            </ul>
        </div>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home">
                <div class="container">
                    <form class="m-1" id="form_data" enctype="multipart/form-data">
                        <fieldset class="border p-2 border-secondary">
                            <legend class="w-auto text-secondary">Add Personal Details : </legend>
                            <div class="col-md-10 offset-md-1">
                                <h4 class="text-success text-center"></h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Select Designation</label>
                                            <select id="design_sal_drop" style="width:400px;" onchange="display_form()" name="desig_id">
                                               
                                        </select>
                                        </div>
                                    </div>
                                </div>
                                <div id="info_form_show" style="display:none">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="First Name">First Name</label>
                                                <input type="text" name="f_name" id="f_name" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="First Name">Last Name</label>
                                                <input type="text" name="l_name" id="l_name" class="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Email address">Email address</label>
                                                <input type="text" name="email" id="email" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="Email address">Mobile</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">+91</span>
                                                </div>
                                                <input type="text" name="mobile" id="mobile" class="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="exampleFormControlFile1">Profile Picture</label>
                                                <input type="file" id="file" name="upload_images" class="form-control-file" accept="image/x-png,image/gif,image/jpeg">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" id="add" class="btn btn-primary btn-lg">Add Info</button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    <h5 class="text-center text-primary">Reports</h5>
                    <hr style="height:1px;border:none;color:#333;background-color:#333;" />
                    <div id="records_table" class="text-center text-danger"></div>
                    <div class="row mt-5">
                        <div class="col-md-8">
                            <div class="form-group text-left" id="toggle_drop">
                                <label for="exampleFormControlSelect1">Select Designation</label>
                                <select id="design_sal_drop1" style="width:400px;" onchange="report_by_design()" name="desig_id">
                                <option value="">Select Designation</option>
                            </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div id="print_data" style="display:none" class="text-right">
                                <i class='far fa-file-pdf fa-3x' onclick='pdf_data()'>&nbsp;</i>
                                <i class='far fa-file-excel fa-3x' onclick='excel_data()'>&nbsp;</i>
                            </div>
                        </div>
                    </div>

                    <table id='example' class='display table table-bordered'>
                        <thead>
                            <tr class="table-secondary">
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Profile</th>
                                <th>Designation</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div id="down_pdf" style="display:none">

                    </div>
                    <div class="modal fade" id="myModal" tabindex="-1">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Info</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
            </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <input type="hidden" id="info_id" class="form-control">
                                            <label for="recipient-name" class="col-form-label">First Name:</label>
                                            <input type="text" class="form-control" id="fname">
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Last Name:</label>
                                            <input class="form-control" id="lname" />
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Mobile</label>
                                            <input class="form-control" id="m_mobile" />
                                        </div>
                                        <div class="form-group">
                                            <label for="message-text" class="col-form-label">Email:</label>
                                            <input type="email" class="form-control" id="eemail" />
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onclick="update_info()">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Delete Info</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <input type="hidden" id="info_id1" class="form-control">
                                        </div>
                                        <p>
                                            Are you sure you want to delete the records then press on delete else press close
                                        </p>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onclick="delete_info()">Delete</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <div class="col-md-10 offset-md-1">
                    <form class="m-3">
                        <fieldset class="border p-2 border-secondary">
                            <legend class="w-auto text-secondary">Add Salary Details : </legend>
                            <div class="col-md-10 offset-md-1">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Select Designation</label>
                                            <select id="design_sal_drop2" style="width:400px;" onchange="show_sal_form()">
                                               <option value="">Select Designation</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                                <div id="sal_form_show" style="display:none">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div>
                                                <label for="exampleFormControlSelect1">Select Name</label>
                                                <select id="info_sal_id" class="form-control" style="width:300px;">
                                                        <option value="">Select Name</option>
                                            </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="First Name">Enter Salary</label>
                                                <input type="text" name="salary" id="salary" class="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button type="button" onclick="add_salary()" class="bn btn-primary btn-lg">Add Salary</button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <h5 class="text-center text-success">Reports</h5>
                <hr style="height:1px;border:none;color:#333;background-color:#333;" />
                <div id="sal_table" class="text-center text-danger"></div>
                <div class="row mt-5">
                    <div class="col-md-8">
                        <div class="form-group text-left" id="toggle_drop_sal">
                            <label for="exampleFormControlSelect1">Select Designation</label>
                            <select id="design_sal_drop3" style="width:400px;" onchange="report_by_salary()" name="desig_id">
                                <option value="">Select Designation</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div id="print_data_sal" style="display:none" class="text-right">
                            <i class='far fa-file-pdf fa-3x' onclick='pdf_sal_data()'>&nbsp;</i>
                            <i class='far fa-file-excel fa-3x' onclick='excel_sal_data()'>&nbsp;</i>
                        </div>
                    </div>
                </div>

                <table id='example_sal' class='display table table-bordered' width="100%">
                    <thead>
                        <tr class="table-secondary">
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Designation</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div id="print_sal" style="display:none">

                </div>
                <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Delete Info</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                             <span aria-hidden="true">&times;</span>
                                        </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <input type="hidden" id="sal_id1" class="form-control">
                                    </div>
                                    <p>
                                        Are you sure you want to delete the records then press on delete else press close
                                    </p>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="delete_sal_info()">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <div class="container">
                    <form id="myform" class="myform" method="post" name="myform">
                        <fieldset class="border p-2 border-secondary">
                            <legend class="w-auto text-secondary">Send Notification: </legend>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group text-left">
                                        <label for="exampleFormControlSelect1">Select Designation</label>
                                        <select id="design_sal_drop4" style="width:400px;" onchange="message_by_design()" name="desig_id">
                                        <option value="">Select Designation</option>
                                     </select>
                                    </div>
                                    <div class="form-group text-left">
                                        <select class="form-control" id="lang" style="width:400px;" onchange="change_lang()">
                                      <option value="1">English</option>
                                      <option value="2">Marathi</option>
                                    </select>
                                    </div>
                                    <div class="form-group text-left">
                                        <h6>Enter Message Content</h6>
                                        <textarea id="language" class="form-control" cols="6" rows="9"></textarea>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="select_all" value="option1">
                                            <label class="form-check-label">Select All checkboxes</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card">
                                        <div class="card-body" id="mySelect">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center my-5">
                                <button type="submit" class="bn btn-primary btn-lg">Send Messages</button>
                            </div>
                        </fieldset>
                    </form>
                    <div id="myResponse">

                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-designation">
                <div class="container">
                    <h3 class="text-center text-success">Add Desinations</h3>
                    <form class="my-3" id="form_desi">
                        <fieldset class="border p-2 border-secondary">
                            <legend class="w-auto text-secondary">Add Designation Details : </legend>
                            <div class="row">
                                <div class="col-md-6 offset-md-3 my-3">
                                    <div class="form-group">
                                        <label>Enter Designation</label>
                                        <input type="text" name="desig_name" id="desig_name" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Enter description</label>
                                        <textarea class="form-control" name="desig_desc" id="desig_desc" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="submit" id="add" class="btn btn-primary btn-lg">Add Info</button>
                            </div>
                        </fieldset>
                    </form>
                    <h5 class="text-center text-success">Reports</h5>
                    <hr style="height:1px;border:none;color:#333;background-color:#333;" />
                    <div id="design_table" class="m-3">
                        <div id="print_design_icon" style="display:none" class="text-right m-3">
                            <i class='far fa-file-pdf fa-3x' onclick='pdf_sal_data()'>&nbsp;</i>
                            <i class='far fa-file-excel fa-3x' onclick='excel_sal_data()'>&nbsp;</i>
                        </div>
                        <table id='tbl_design' class='table table-striped table-bordered' width="100%">
                            <thead>
                                <tr class="table-secondary">
                                    <th>ID</th>
                                    <th>Designation</th>
                                    <th>Description</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div id="print_design" style="display:none">

                    </div>
                    <div class="modal fade" id="delete_design" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <input type="hidden" id="desig_id" class="form-control">
                                        </div>
                                        <p>
                                            Are you sure you want to delete the records then press on delete else press close
                                        </p>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onclick="delete_design()">Delete Designation</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/js/select2.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>

<script src="main.js"></script>
<script>
    $(document).ready(function() {
        $('#select_all').on('click', function() {
            if (this.checked) {
                $('input[type=checkbox]').each(function() {
                    this.checked = true;
                });
            } else {
                $('input[type=checkbox]').each(function() {
                    this.checked = false;
                });
            }
        });

        $('input[type=checkbox]').on('click', function() {
            if ($('input[type=checkbox]:checked').length == $('input[type=checkbox]').length) {
                $('#select_all').prop('checked', true);
            } else {
                $('#select_all').prop('checked', false);
            }
        });
    });
</script>
<script type="text/javascript" src="http://www.google.com/jsapi">
</script>

<script type="text/javascript">
    function change_lang() {
        var lang = $('#lang option').filter(":selected").val();
        if (lang == 2) {
            destinationLanguage: [google.elements.transliteration.LanguageCode.HINDI]
        } else if(lang == 1){
            destinationLanguage: [google.elements.transliteration.LanguageCode.ENGLISH]
        }
    }
    google.load("elements", "1", {
        packages: "transliteration"
    });
    function onLoad() {
        var options = {
            sourceLanguage: google.elements.transliteration.LanguageCode.ENGLISH,
            destinationLanguage: [google.elements.transliteration.LanguageCode.MARATHI],
            shortcutKey: 'ctrl+g',
            transliterationEnabled: true
        };
        var control =
            new google.elements.transliteration.TransliterationControl(options);

        // Enable transliteration in the editable DIV with id
        // 'transliterateDiv'.
        control.makeTransliteratable(['language']);
    }
    google.setOnLoadCallback(onLoad);
</script>