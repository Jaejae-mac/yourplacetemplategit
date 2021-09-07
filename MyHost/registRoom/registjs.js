var num = 1;
//세부 방 타이틀
var room_title = null;
//기본 인원
var base_num = null;

var tagRoom = {};
var counterRoom = 0;

// 입력한 값을 태그로 생성한다.
function addTag(value) {
    tagRoom[counterRoom] = value;
    counterRoom++; // del-btn 의 고유 id 가 된다.
}

$(document).ready(function () {
    $("#btn1")
        .parent()
        .css({ "text-align": "left", "margin-left": "10px" });
    $(".base_num").parent().css({ "text-align": "left" });
    $("#btn1").click(function () {
        room_title = $(".room_title").val();
        base_num = $(".base_num").val();
        var html =
            "<tr><td>" +
            num +
            "</td><td>" +
            room_title +
            "</td><td>" +
            base_num +
            "</td>" +
            "<td><button class='del-btn-room btn btn-danger' idx='" +
            counterRoom +
            "'> X </button></td></tr>";
        $(".detail_tbody").append(html);
        addTag(room_title);
        $(".room_title").val("");
        $(".base_num").val("");

        num++;
    });

    // 삭제 버튼
    // 인덱스 검사 후 삭제
    $(document).on("click", ".del-btn-room", function (e) {
        var index = $(this).attr("idx");
        console.log(index);
        tagRoom[index] = "";
        delete tagRoom[index];
        num--;
        $(this).parent().parent().remove();
    });
});
//파일전송 시작.
var counterFile = 0;
var tagFile = {};
function addTag(value) {
    tagFile[counterFile] = value;
    counterFile++; // del-btn 의 고유 id 가 된다.
}
function processSelectedFiles(fileInput) {
    counterFile = 1;
    var files = fileInput.files;
    $(".file-name-div").css({ height: "auto" });
    $("#file-name").text("");
    if (files.length > 3) {
        alert("최대 등록 가능 사진은 3장입니다.");
    } else {
        for (var i = 0; i < files.length; i++) {
            $("#file-name").append(
                "<li class='tag-item'>" +
                files[i].name +
                "<span class='del-btn-file' idx='" +
                counterFile +
                "'> X</span></li>"
            );
            addTag(files[i].name);
        }
    }
}
$(document).on("click", ".del-btn-file", function (e) {
    var index = $(this).attr("idx");
    tagFile[index] = "";
    $(this).parent().remove();
});
//다음 api 시작
//본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ""; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
                extraRoadAddr +=
                    extraRoadAddr !== ""
                        ? ", " + data.buildingName
                        : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraRoadAddr !== "") {
                extraRoadAddr = " (" + extraRoadAddr + ")";
            }

            // 주소 정보를 해당 필드에 넣는다.
            document.getElementById("roadAddress").value = roadAddr;
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if (data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML =
                    "(예상 도로명 주소 : " + expRoadAddr + ")";
                guideTextBox.style.display = "block";
            }
        },
    }).open();
}
//해시태그 시작.
$(document).ready(function () {
    var tag = {};
    var counter = 0;

    // 입력한 값을 태그로 생성한다.
    function addTag(value) {
        tag[counter] = value;
        counter++; // del-btn 의 고유 id 가 된다.
    }

    // tag 안에 있는 값을 array type 으로 만들어서 넘긴다.
    function marginTag() {
        return Object.values(tag).filter(function (word) {
            return word !== "";
        });
    }

    // 서버에 제공
    $("#tag-form").on("submit", function (e) {
        var value = marginTag(); // return array
        $("#rdTag").val(value);

        $(this).submit();
    });

    $("#tag").on("keypress", function (e) {
        var self = $(this);

        //엔터나 스페이스바 눌렀을때 실행
        if (e.key === "Enter" || e.keyCode == 32) {
            console.log('hashtag length Obj: ' + Object.keys(tag).length);
            if (Object.keys(tag).length > 4) {
                alert('5개이상 태그를 등록할 수 없습니다.');
                return;
            }
            var tagValue = self.val(); // 값 가져오기

            // 해시태그 값 없으면 실행X
            if (tagValue !== "") {
                // 같은 태그가 있는지 검사한다. 있다면 해당값이 array 로 return 된다.
                var result = Object.values(tag).filter(function (word) {
                    return word === tagValue;
                });

                // 해시태그가 중복되었는지 확인
                if (result.length == 0) {
                    $("#tag-list").append(
                        "<li class='tag-item'>#" +
                        tagValue +
                        "<span class='del-btn' idx='" +
                        counter +
                        "'> | x</span></li>"
                    );
                    addTag(tagValue);
                    self.val("");
                } else {
                    alert("태그값이 중복됩니다.");
                }
            }
            e.preventDefault(); // SpaceBar 시 빈공간이 생기지 않도록 방지
        }
    });

    // 삭제 버튼
    // 인덱스 검사 후 삭제
    $(document).on("click", ".del-btn", function (e) {

        var index = $(this).attr("idx");
        tag[index] = "";
        delete tag[index];
        console.log('hashtag length Obj: ' + Object.keys(tag).length);
        $(this).parent().remove();
    });
});