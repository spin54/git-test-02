import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MenuItemList(props){
    const {title,dataList,onMenuClick} = props

    return <>
    <h2>{title}</h2>
    <ul style={{listStyle:"none"}}>
        {dataList.map((dt,index)=>{
            return <li key={index}><a href="#" onClick={(e)=>{
                e.preventDefault();
                onMenuClick(dt.no);
            }}>{dt.name}</a> / {dt.price} </li>
        })}
    </ul>
    </>
}
//주문현황
function OrderStatusPage(props){
    const {jumunList} = props
    const [tableNo, setTableNo] = useState(1)

    return <>
        <h1>주문현황 : 테이블번호 : {tableNo}</h1>

    </>
}

function MenuOrderPage(props) {
    const [siksaList, setSiksaList] = useState([])//식사류
    const [gansikList, setGansikList] = useState([])//간식류
    const [jumunList, setJumunList] = useState([])//주문현황목록
    //초기화코드
    useEffect(()=>{
        setSiksaList([
            {name:"비빔밥", price:7000},
            {name:"김치복음밥", price:7000},
        ])
        setGansikList([
            {name:"라면", price:5000},
            {name:"라볶이", price:6000},
        ])
    },[])

    //식사류,간식류 선택시 주문현황으로 데이터 전달
    function siksaJumun(menuno){
        for(let ss of siksaList){
            if(ss.no == menuno){
                setJumunList( [...jumunList, ss] )
                break;
            }
        }
    }
    function gansikJumun(menuno){
        for(let ss of gansikList){
            if(ss.no == menuno){
                setJumunList( [...jumunList, ss] )
                break;
            }
        }
    }

    return (
        <>
    <Container>
        <h1>주문화면</h1>
      <Row>
        <Col xs={3}>
        <h2>식사류</h2>
        <ul style={{listStyle:"none"}}>
            {siksaList.map((dt,index)=>{
                return <li key={index}><a href="#" onClick={(e)=>{
                    e.preventDefault();
                    siksaJumun(dt.no) //식사주문
                }}>{dt.name}</a> / {dt.price}</li>
            })}
        </ul>
        </Col>
        <Col xs={3}>간식류<MenuItemList 
                            title="간식류" 
                            dataList={gansikList}
                            onMenuClick={gansikJumun}/></Col>
        <Col xs={6}>주문현황:{jumunList.length}</Col>
      </Row>
    </Container>

        </>
    );
}

export default MenuOrderPage;