var lt = /</g,
    gt = />/g,
    ap = /'/g,
    ic = /"/g;

$(document).ready(function() {
    $('#list button').click(function() {
        $.ajax({
            method: "get",
            url: "./list",
            success: function(data) {
                data = JSON.parse(data);
                var html = "<table class='ui celled table'><thread><tr><th>Id</th><th>Name</th></tr></thread><tbody>"
                $.each(data, function(key, value) {
                    html += "<tr><td data-label='Id'>" + key + "</td>";
                    html += "<td data-label='Name'>" + value + "</td></tr>"
                });
                html += "</tbody></table>"
                $("#result").html(html);
            }
        });
    });

    $('#search button').click(function() {
        var id_val = $("#search input[name='id']").val().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
        $.ajax({
            method: "post",
            url: "./search",
            data: {
                id: id_val
            },
            success: function(data) {
                $("#result").html('<p>' + data + '</p>');
            }
        });
    });

    $('#add button').click(function() {
        var id_val = $("#add input[name='id']").val().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
        var name_val = $("#add input[name='name']").val().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
        $.ajax({
            method: "post",
            url: "./add",
            data: {
                id: id_val,
                name: name_val
            },
            success: function(data) {
                $("#result").html('<p>' + data + '</p>');
            }
        });
    });

    $('#delete button').click(function() {
        var id_val = $("#delete input[name='id']").val().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
        $.ajax({
            method: "post",
            url: "./delete",
            data: {
                id: id_val
            },
            success: function(data) {
                $("#result").html('<p>' + data + '</p>');
            }
        });
    });
});