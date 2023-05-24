import { useState } from "react";
import { useHistory } from "react-router-dom";



function Search() {
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]);
    const history = useHistory();

    const onChange = (event) => setToDo(event.target.value);
    const onSubmit = async (event) => {
        event.preventDefault();
        if (toDo === "") {
        return;
        }
        setToDos((currentArray) => [toDo, ...currentArray]);
      //setToDo("");
        //history.push("/saved");
    
        const query = async (data) => {
        const response = await fetch("https://api-inference.huggingface.co/models/lawcompany/KLAID_LJP_base", {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
        };
    
        const queryResult = await query({ "inputs": toDo });
        const str = JSON.stringify(queryResult);
      //const arr = str.split("},");
      //const labelarr = arr[0].substring(3).split('",')[0].substring(9).split(',');
      //setSearchResults(labelarr);
      //console.log(str);
        const regex = /\{"label":"([^"]+)"/;
        const match = str.match(regex);
        const labels = match ? match[1].split(",") : [];
        setSearchResults(labels);
        console.log(str);
    };
    
    
    let style1 = {
        display: "inline-block",
        width: "1050px",
      //height: "`${searchResults.length * 50}px`",
      height: "55px", // Adjust the height based on the number of results
        border: "1px solid",
        color: "#9A9A9A"
    }

    let style2 = {
        display:"inline-block",
        width:"500px",
        height:"300px",
        border: "1px solid",
        color: "#9A9A9A"
    }

    let style3 = {
        color: "red"
    }

    let style4 = {
        width: "1050px",
        height: "100px",
    }

    let buttonStyle = {
        padding: "5px 10px",
        fontSize: "14px",
        width: "150px",
        height: "30px",
        alignSelf: "center",
        marginLeft: "10px", 
        marginTop: "15px",
        background: "#045FB4", 
        border: "2px solid #045FB4",
        color: "white",
        borderRadius: "5px"
    }

    const [searchResults, setSearchResults] = useState([]);


    return (
    <div>

        <div style={{ textAlign: "center" }}>

            <h3 style={{ textAlign: "center", marginLeft: "-680px" }}>형사소송의 유·무죄 판결문을 검색합니다.</h3>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <input 
            onChange = {onChange} 
            value = {toDo} 
            type="text" 
            placeholder="상황을 입력하세요..."
            style= {style4}
            />
            <button style={buttonStyle}>검색하기</button>
            </form>
            </div>

            <h3 style={{ textAlign: "center", marginLeft: "-950px" }}>검색 결과</h3>
            <div style={{ ...style1, textAlign: "left", overflow: "hidden" }}>
            <ul>
                <div style={{ ...style3, display: "flex", flexWrap: "wrap", justifyContent: "flex-start", marginLeft: "-20px" }}>
                {searchResults.map((result, index) => (
                    <div key={index} style={{ 
                    padding: "5px 15px", 
                    //background: "#e0e0e0", 
                    borderRadius: "20px", 
                    marginRight: "10px", 
                    marginBottom: "10px",
                    marginTop: "-6px",
                    border: "2px solid #ff0000",
                    
                    }}>
                    {result}
                    </div>
                ))}
                </div>
            </ul>
            </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginRight: "50px", textAlign: "center" }}>
            <h3 style={{ textAlign: "center", marginLeft: "-400px" }}>무죄 판례</h3>
                <div style={{ ...style2, display: "inline-block", margin: "0 auto" }}>
                </div>
            </div>

            <div style={{ textAlign: "center" }}>
            <h3 style={{ textAlign: "center", marginLeft: "-400px"}}>유죄 판례</h3>
                <div style={{ ...style2, display: "inline-block", margin: "0 auto" }}>
                </div>
            </div>
        </div>

        <h3>검색 기록</h3>
        {toDos.map((item,index) => (
            <li key={index}>{item}</li> //props를 넣으라는 에러가 떠서 넣음.
        ))}
        
        </div>
    </div>
    );
};
export const name = 'jj';
export default Search;
