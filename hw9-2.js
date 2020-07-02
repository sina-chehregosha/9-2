let xhttp;
let personInfo = {};
let additionalPersonInfo = {};
let completePersonInfo = [];
let temporaryObject = {};
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        personInfo = JSON.parse(this.responseText).personInfo;

        let xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                additionalPersonInfo = JSON.parse(this.responseText).additionalPersonInfo;
                // console.log(personInfo);
                // console.log(additionalPersonInfo);
                for (let i = 0; i < personInfo.length; i++) {
                    for (let n = 0; n < additionalPersonInfo.length; n++) {
                        if (personInfo[i].uid === additionalPersonInfo[n].uid) {
                            temporaryObject = {
                                ...personInfo[i], //these ... are called "SPREAD OPERATORS" which means the temporaryObject will be a new object with all the properties of personInfo Object
                                ...additionalPersonInfo[n]
                            }
                            completePersonInfo.push(temporaryObject);
                        }
                    }
                }
                // console.log(completePersonInfo);
                let i;
                for (i = 0; i < completePersonInfo.length; i++) {
                    $("table").append(
                        `<tr id=row${i}>
                            <td scope="row" contenteditable="false">${completePersonInfo[i].uid}</td>
                            <td scope="row" contenteditable="false">${completePersonInfo[i].firstName}</td>
                            <td scope="row" contenteditable="false">${completePersonInfo[i].lastName}</td>
                            <td scope="row" contenteditable="false">${completePersonInfo[i].city}</td>
                            <td scope="row" contenteditable="false">${completePersonInfo[i].postalCode}</td>
                            <td scope="row" contenteditable="false">${completePersonInfo[i].phoneNumber}</td>
                            <td scope="row" contenteditable="false">${completePersonInfo[i].position}</td>
                            <td scope="row" class="deleteIcon"><i class="far fa-trash-alt" id="delete${i}" style="cursor: pointer; color: transparent" disabled></i></td>
                        </tr>`);
                }
                console.log(i);
                


                
                // $("tr").click(function(){
                //     let theID = $(this).attr("id");
                //     theID = theID.substring(3); // substring(n) removes n characters from beginning of 
                //     alert(JSON.stringify(completePersonInfo[theID]));
                // })


                $("#editing").hide();

                $("#editButton").click(function () {
                    $("td").attr("contenteditable", "true");
                    $(".deleteIcon").attr("contenteditable", "false");
                    $("#editing").show();
                    $("#editButton").prop('disabled', true);
                    $(".fa-trash-alt").prop('disabled', true).css("color","red");
                    $("#addButton").prop('disabled', false);
                    $("#applyButton").prop('disabled', false);
                });

                $("#addButton").click(function(){
                    if($('addButton').prop("disabled")){
                    } else {
                        $("table").append(
                            `<tr id=row${i}>
                                <td scope="row" contenteditable="true"></td>
                                <td scope="row" contenteditable="true"></td>
                                <td scope="row" contenteditable="true"></td>
                                <td scope="row" contenteditable="true"></td>
                                <td scope="row" contenteditable="true"></td>
                                <td scope="row" contenteditable="true"></td>
                                <td scope="row" contenteditable="true"></td>
                                <td scope="row" class="deleteIcon"><i class="far fa-trash-alt" id="delete${i}" style="cursor: pointer; color: red" disabled></i></td>
                                </tr>`);
                    }
                });

                $(".fa-trash-alt").click(function () {
                    if ($(".fa-trash-alt").prop("disabled")){
                        let deleteID = $(this).attr("id");
                        deleteID = deleteID.substring(6);
                        $(`#row${deleteID}`).remove();
                        // console.log(deleteID);
                    }
                });

                $("#applyButton").click(function(){
                        $("td").attr("contenteditable", "false");
                        $("#editButton").prop('disabled', false);
                        $(".fa-trash-alt").prop('disabled', false).css("color","red");
                        $("#addButton").prop('disabled', true);
                        $("#applyButton").prop('disabled', true);
                        $(".fa-trash-alt").prop('disabled', false).css("color","transparent");
                        $("#editing").hide();
                });

                
            };
        };
        xhttp2.open("GET", "https://api.npoint.io/dc6cb50568fac72a4105", true);
        xhttp2.send();
    };
};

xhttp.open("GET", "https://api.npoint.io/177cea9c157de479d51b", true);
xhttp.send();