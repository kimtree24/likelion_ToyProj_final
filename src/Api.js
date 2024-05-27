const baseurl = "http://krokodile.kro.kr:8000";

async function fetchData() {
    const response = await fetch(baseurl, { method: "GET" });
    const data = await response.json();

    console.log(data);
    return data;
}

function parsing(time) {
    let result = [];
    for (let k = 2; k < 20; k += 3) {
        result.push(time.slice(k, k + 2));
    }
    return `${result[0]}년${result[1]}월${result[2]}일${result[3]}시${result[4]}분${result[5]}초`;
}

async function postData(title, author, content, passcode) {
    const response = await fetch(baseurl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            author,
            content,
            passcode,
        }),
    });
    
    // if (response.status === 400) {
    //     alert('빈칸 없이 다 작성해주세요!!');
    //     return;
    // }

    const responseData = await response.json();

    //비밀번호 관련
    if (response.status === 400 && responseData.passcode && responseData.passcode[0] === "This field may not be blank.") {
        alert('비밀번호 누락!!');
        return;
    }
    if (response.status === 400 && responseData.passcode && responseData.passcode[0] === "Ensure this field has no more than 15 characters.") {
        alert('비밀번호는 15자 이내!!');
        return;
    }

    // 타이틀 관련
    if (response.status === 400 && responseData.title && responseData.title[0] === "This field may not be blank.") {
        alert('제목 누락!!');
        return;
    }
    if (response.status === 400 && responseData.title && responseData.title[0] === "Ensure this field has no more than 20 characters.") {
        alert('제목은 20자 이내!!');
        return;
    }

    // 작성자 관련
    if (response.status === 400 && responseData.author && responseData.author[0] === "This field may not be blank.") {
        alert('작성자 누락!!');
        return;
    }
    if (response.status === 400 && responseData.author && responseData.author[0] === "Ensure this field has no more than 10 characters.") {
        alert('작성자는 10자 이내!!');
        return;
    }

    // 컨텐츠 관련
    if (response.status === 400 && responseData.content && responseData.content[0] === "This field may not be blank.") {
        alert('본문 누락!!');
        return;
    }

    return responseData;
}

async function deleteData(id, inputpasscode) {
    const delURL = `${baseurl}/${id}/`;
    const response = await fetch(delURL, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            passcode: inputpasscode,
        }),
    });

    if (response.status === 204) {
        alert('삭제 성공');
        return;
    }

    if (response.status === 403) {
        alert('비밀번호가 틀립니다.');
        return;
    }
}

export { fetchData, parsing, postData, deleteData };