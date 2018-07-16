jQuery("#loader").show();
jQuery.ajax({
    type: "POST",
    url: "index.php?option=com_notifint&task=fees.get_payout_report",
    data: JSON.stringify({
        payout_date: payout_date
    }),
    contentType: "JSON",
    success: function (msg) {
        var obj = jQuery.parseJSON(msg);
        jQuery("#payout_report_table").show();
        if (obj['flag'] == 1) {
            jQuery('#payout_report_table').DataTable().destroy();
            var table = jQuery('#payout_report_table').DataTable({
                data: obj['result'],
                columns: [
                    {
                        "className": 'details-control',
                        "searchable": false,
                        "orderable": true,
                        "targets": 0,
                        "defaultContent": '<center><img src="images/details_open.jpg" style="border:0px;border-radius:5px;width:25px;height:25px"></center>',
                                },
                    {
                        "className": "replyIdClass",
                        "data": "payout_id"
                                },
                    {
                        "data": {},
                        "className": "replyIdClass_amount",
                        "render": function (data, type, full, meta) {
                            return NumberInRs(data.payout_amount);
                        }
                                 },
                    {
                        "data": "im_account_label"
                    }
                            ],
                lengthMenu: [
                                [50, 100, -1],
                                ['50', '100', 'Show all']
                            ]
            });

            jQuery("#payout_report_table tbody").unbind();
            jQuery('#payout_report_table tbody').on('click', 'td.details-control', function () {
                var id = jQuery(this).closest('tr').find('.replyIdClass').text();
                var amount = jQuery(this).closest('tr').find('.replyIdClass_amount').text();
                var tr = jQuery(this).closest('tr');
                //var row = table.row( tr );
                var row = jQuery('#payout_report_table').DataTable().row(tr);

                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    if (table.row('.shown').length) {
                        jQuery('.details-control', table.row('.shown').node()).click();
                    }
                    //row.child( format(row.data()), id ).show();
                    get_payout_id_details(row.child, id, amount); // here pass the replyIdClass variable to function format
                    tr.addClass('shown');
                } //end else
            });
            jQuery("#loader").hide();
        } else {
            jQuery("#loader").hide();
            var table = jQuery('#payout_report_table').DataTable();
            var rows = table.rows().remove().draw();
        }
    },
    error: function (msg) {
        alert('Please try after sometime!!!');
    }
});