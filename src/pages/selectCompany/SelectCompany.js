import React, { useState } from "react";
import {withRouter} from "react-router-dom";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import useStyles from "./styles";
import CustomCard from "../../components/Card";

// 예제 데이터
const initialCardData = [
    // {
    //   logo: '/Midoin/MidoinLogo.jpeg',
    //   name: '스타벅스',
    //   description: '강남점',
    //   date: '생성일: 2024-03-20',
    // }
]
function SelectCompany(props) {
    var classes = useStyles();
    const [cardData, setCardData] = useState(initialCardData);
    const [open, setOpen] = useState(false); // 모달 상태
    const [newItem, setNewItem] = useState({ name: '', description: '', logo: ''}); // 새 항목의 상태
    const [cardImagePreview, setCardImagePreview] = useState(null); // 이미지 미리보기 URL 상태

    // 카드 데이터 업데이트 함수
    const updateCard = (id, updatedData) => {
        const updatedCards = cardData.map(card => {
            if (card.id === id) {
                return { ...card, ...updatedData };
            }
            return card;
        });
        setCardData(updatedCards);
    };
    // 매장 생성함수
    const handleAddCard = () => {
        setCardData([...cardData, newItem]); // 기존 cardData에 새 카드 추가
        // 모달 닫기
        handleClose()
    };

    // 모달 오픈
    const handleOpen = () => {
        setOpen(true);
    }
    // 모달 닫기
    const handleClose = () => {
        setNewItem({ name: '', description: '', logo: '' })
        setCardImagePreview("")
        setOpen(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };
    const handleCardImageChange = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        // todo : image 보내서 링크로 받기
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewItem({ ...newItem, [name]:reader.result ,"imageFile": file });
                setCardImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleLogout = () => {
        console.log("로그아웃")
    }
    return (
        <Grid container className={classes.selectStoreContainer}>
            <div
                className={classes.customFormContainer}
                style={{
                    marginTop: 50,
                    width: "50%"
                }}
            >
                <Grid container spacing={2} style={{ marginTop: 50 }}>
                    <Grid item xs={12} className={classes.addButtonContainer} >
                        <Button onClick={handleLogout} color="secondary">다시 계정으로 로그인하기</Button>
                        <Button onClick={handleOpen} color="primary">매장 추가하기</Button>
                    </Grid>
                    {/*<div className={classes.cardContainer}>*/}
                    {cardData.map((data, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <CustomCard key={index} {...data} updateCard={updateCard} className={classes.marginTop}/>
                        </Grid>
                    ))}
                </Grid>
                {/*</div>*/}
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">매장 추가하기</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        {/* 이미지 업로드 필드 */}
                        <input
                            accept="image/*"
                            style={{display: 'none'}}
                            id="raised-button-file"
                            name="logo"
                            type="file"
                            onChange={handleCardImageChange}
                        />
                        <div style={{position: 'relative', width: "auto", maxWidth: '452px', height: '452px', alignContent: "center"}}>
                            {/* 이미지 미리보기 */}
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    marginTop: '10px',
                                    border: '1px solid #ddd',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundImage: `url(${cardImagePreview})`,
                                }}
                            >
                                {!cardImagePreview && '이미지 업로드'}
                            </div>
                            {/* 이미지 업로드 버튼 */}
                            <label htmlFor="raised-button-file" style={{
                                position: 'absolute',
                                bottom: '10px', // 버튼의 위치를 이미지 아래쪽에 배치
                                right: '10px', // 버튼의 위치를 이미지 오른쪽에 배치
                                background: 'white', // 버튼의 배경색
                                borderRadius: '10%', // 버튼을 원형으로 만듬
                                cursor: 'pointer' // 마우스 오버 시 커서를 손가락 모양으로 변경
                            }}>
                                <Button variant="contained" component="span" style={{padding: 0, minWidth: 0}}>
                                    <CollectionsIcon/>
                                </Button>
                            </label>
                        </div>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="매장명"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            style={{
                                marginTop: "20px"
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="지점"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                        />
                        {/* 상태는 기본적으로 '활성화'로 설정 */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            취소
                        </Button>
                        <Button onClick={handleAddCard} color="primary">
                            추가
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Grid>
    )
}

export default withRouter(SelectCompany);