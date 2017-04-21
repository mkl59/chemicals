// Version: v1.3
// Date of Create: 01.10.2016
// Date of Update: 08.11.2016
// Updated by: Enes Demirci
// Update Reason: Fileupload boşken alert engellendi.
// Update Reason: [data-ns-form="GlobalForm"] olarak güncellendi
// Update Reason: [data-ns-form="NewsletterSignUp"]  Ebülten Eklendi

$(document).ready(function () {
    $('[data-ns-form="NewsletterSignUp"]').click(function (e) {


        e.preventDefault();
        var error = false;

        var formID = $(this).closest("form").attr('id');


        $('#' + formID + ' [data-ns-required="email"]').each(function () {
            var InputValue = $(this).val();
            var InputID = $(this).attr("ID");
            if (InputValue.length == 0) {
                error = true;
                $('#' + InputID).addClass("error_input");
            } else if (!validateEmail(InputValue)) {
                error = true;
                $('#' + InputID).addClass("error_input");
            }
        });


        //=================Tıklanan kutunun hata mesajını kaldırıyoruz===============================
        $('[data-ns-required]').click(function () {
            $(this).removeClass("error_input");
        });

        if (error == false) {
            var form1 = $("form").serialize();
            form2 = new FormData($("#" + formID)[0]);

            $.ajax({
                type: "POST",
                url: "/GlobalNewsLetter",
                data: form2,
                processData: false,
                contentType: false,
                //=================Eposta Kontrolü===============================
                success: function (data) {
                    $('#' + formID + ' input[data-ns-form="GlobalForm"]').hide(100);
                    $('.success-form').text(data);
                    $('.success-form').fadeIn(500);
                },
                complete: function () {
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $('.success-form').text(thrownError);
                    $('.error-form').fadeIn(500);
                }
            });
        }

    });


    $('[data-ns-form="GlobalForm"]').click(function (e) {
        e.preventDefault();
        var error = false;        
        var formID = $(this).closest("form").attr('id');


     
        //=================Text Kontrolü===============================
        $('#' + formID + ' [data-ns-required="text"]').each(function () {
            var InputValue = $(this).val();
            var InputID = $(this).attr("ID");
            if (InputValue.length == 0) {
                error = true;
                $('#' + InputID).addClass("error_input"); 
            }
        });
        //=================Eposta Kontrolü===============================
        $('#' + formID + ' [data-ns-required="email"]').each(function () {           
            var InputValue = $(this).val();
            var InputID = $(this).attr("ID");
            if (InputValue.length == 0) {
                error = true;
                $('#' + InputID).addClass("error_input");
            } else if (!validateEmail(InputValue)) {
                error = true;
                $('#' + InputID).addClass("error_input");
            }
        });
        //=================FileUpload Kontrolü===============================
        $('#' + formID + ' [data-ns-form="fileupload"]').each(function () {
            var ext = $(this).val().split('.').pop().toLowerCase();
            var name = $(this).attr("name");
            var extensions = $(this).attr("data-ns-fileTypes");
            var extensionArray = extensions.split(",");

            if (($.inArray(ext, extensionArray) == -1) && (ext.length > 0)) {
                error = true;
                alert(name + " alanına " + extensions + " uzantıları yükleyebilirsiniz.");
            }
        });
        //=================Tıklanan kutunun hata mesajını kaldırıyoruz===============================
        $('[data-ns-required]').click(function () {
            $(this).removeClass("error_input");
        });


       
      

        if (error == false) {
            var form1 = $("form").serialize();
            form2 = new FormData($("#" + formID)[0]);       

            $.ajax({
                type: "POST",
                url: "/SendFormGlobal",
            
                data: form2,
                processData: false,
                contentType: false,
                //=================Eposta Kontrolü===============================
                success: function (data) {
                    $('#' + formID + ' input[data-ns-form="GlobalForm"]').hide(100);
                    $('.success-form').text(data);
                    $('.success-form').fadeIn(500);
                },
                complete: function () {
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $('.success-form').text(thrownError);
                    $('.error-form').fadeIn(500);
                }
            });
        }
    });
});


function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}