import React, {
    useEffect,
    useState
} from "react";
import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
    Paper, Table, TableBody, TableCell, TableRow, TextField, Typography
} from "@material-ui/core";
import useStyles from "./styles";
import {useGPTChatMutation, usePromptUpdateMutation} from "../../api/mutations";
import {backdropState} from "../../recoil/atoms";
import {useSetRecoilState} from "recoil";

export default function UseCaseCard(props) {
    const classes = useStyles();
    const setBackDropOpen = useSetRecoilState(backdropState);
    const handleGPTChatSuccess = (data) => {
        setResult1(`${promptText}`);
        setResult2(`${data.answer}`);
        setVisible(true);
        setBackDropOpen(false)
    };
    const handleGPTChatError = (error) => {
        //console.error('GPTChat 실패:', error);
        setBackDropOpen(false)
    };
    // 로그인
    const {
        mutate: GPTChatMutation
    } = useGPTChatMutation(
        handleGPTChatSuccess,
        handleGPTChatError
    )
    const handlePromptUpdateSuccess = (data) => {
        //console.log('프롬프트 업데이트 성공:', data);
        setUseCase({...useCase, answer: data.data.answer})
    };
    const handlePromptUpdateError = (error) => {
        //console.error('프롬프트 업데이트 실패:', error);
    };
    const {
        mutate: promptUpdateMutation,
    } = usePromptUpdateMutation(
        handlePromptUpdateSuccess,
        handlePromptUpdateError
    );
    const [useCase, setUseCase] = useState(props); // 새 항목의 상태
    const [visible, setVisible] = useState(false);
    const [useCaseModalOpen, setUseCaseModalOpen] = useState(false)
    const [promptText, setPromptText] = useState(props.answer);
    const [result1, setResult1] = useState('');
    const [result2, setResult2] = useState('');
    const [selectedResult, setSelectedResult] = useState('result2');
    const [selectedMenus, setSelectedMenus] = useState([]);
    useEffect(() => {
        if (useCase.items && useCase.menuList) {
            const filteredItems = useCase.menuList.filter(item => useCase.items.includes(item.id));
            setSelectedMenus(filteredItems);
        }
    }, [useCase.items, useCase.menuList]); // 의존성 배열에 props.items와 props.menuList를 포함
    const handleUpdateMode = (e) => {
        setUseCaseModalOpen(true)
    }

    const handleUseCaseModalClose = () => {
        setUseCaseModalOpen(false)
        if(useCase.items && useCase.menuList) {
            const filteredItems = useCase.menuList.filter(item => useCase.items.includes(item.id));
            setSelectedMenus(filteredItems);
        }
        setVisible(false);
    }
    const handleUseCaseSave = () => {
        const answer = selectedResult === "result1" ? result1 : result2
        if(props.items instanceof Array) {
            selectedMenus.sort((a, b) => a.id - b.id);
            let items = selectedMenus.map(item => item.id);
            let names = selectedMenus.map(item => item.name);
            promptUpdateMutation({
                id : props.id,
                question: props.question,
                answer: `해당 매장에서 추천하는 메뉴는 ${names.join(', ')} 입니다.`,
                items:items,
            })
        } else {
            promptUpdateMutation({
                id : props.id,
                question: props.question,
                answer,
            })
        }
        setUseCaseModalOpen(false)
        setVisible(false);
    }
    const handleTransform = () => {
        setVisible(false);
        setBackDropOpen(true)
        GPTChatMutation({
            question: props.question,
            prompt: promptText
        })
    }
    const handlePromptChange = (event) => {
        setPromptText(event.target.value);
    };

    const handleResultSelection = (event) => {
        setSelectedResult(event)
    };
    const handleMenuToggle = (menu) => {
        const isAlreadySelected = selectedMenus.some(selectedMenu => selectedMenu.id === menu.id);
        if (isAlreadySelected) {
            setSelectedMenus(prev => prev.filter(item => item.id !== menu.id));
        } else {
            setSelectedMenus(prev => [...prev, menu]);
        }
    };
    const isSelected = (value) => selectedResult === value
    return (
        <>
            <Paper
                style={{
                    marginTop: "20px"
                }}
            >
                <div className={classes.tableSection}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="center"
                                           className={classes.tableHeaderCell}
                                           style={{width: '20%'}}>질문</TableCell>
                                <TableCell align="left"
                                           style={{width: '80%'}}>
                                    {useCase.question}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center"
                                           className={classes.tableHeaderCell}
                                           style={{ width: '20%' }}>답변</TableCell>
                                <TableCell align="left"
                                           style={{ width: '80%' }}>
                                    {useCase.answer}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className={classes.rightAlignContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateMode}
                    >
                        수정하기
                    </Button>
                </div>
            </Paper>
            <Dialog open={useCaseModalOpen} onClose={handleUseCaseModalClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">주미 학습</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography variant="h6" className={classes.questionTitle}>
                        {props.question}
                    </Typography>
                    {Array.isArray(props.items) ?
                        <>
                            <Typography className={classes.questionTitle}>
                                추천메뉴를 선택해 주세요!
                            </Typography>
                            <Box className={classes.scrollableGrid}>
                                {props.menuList.filter(menu => !selectedMenus.includes(menu)).map(menu => (
                                    <Grid item xs={4} key={menu.id}>
                                        <Box
                                            key={menu.id}
                                            className={classes.menuItem}
                                            onClick={() => handleMenuToggle(menu)}
                                        >
                                            <div className={classes.menuImage} style={{
                                                backgroundImage: `url(${menu.imageUrl})`,
                                            }}>
                                                {!menu.imageUrl && "NO IMAGE"}
                                            </div>
                                            <Typography style={{textAlign: "center", wordBreak: "break-word"}}>{menu.name}</Typography>
                                        </Box>
                                    </Grid>
                                ))}

                            </Box>
                            <Typography className={classes.questionTitle}>
                               선택된 추천 메뉴
                            </Typography>
                            <Box className={classes.scrollableGrid}>
                                {selectedMenus.map(menu => (
                                    <Grid item xs={4} key={menu.id}>
                                        <Box
                                            key={menu.id}
                                            className={classes.menuItem}
                                            onClick={() => handleMenuToggle(menu)}
                                        >
                                            <div className={classes.menuImage} style={{
                                                backgroundImage: `url(${menu.imageUrl})`,
                                            }}>
                                                {!menu.imageUrl && "NO IMAGE"}
                                            </div>
                                            <Typography>{menu.name}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Box>
                        </>
                        :
                        <TextField
                            margin="dense"
                            label="답변을 작성해 주세요."
                            type="text"
                            multiline
                            rows={6}
                            variant="outlined"
                            name="answer"
                            onChange={handlePromptChange}
                            value={promptText || ""}
                            // onChange={handleUpdateChange}
                            fullWidth
                            className={classes.textFieldCustom}
                        />
                    }
                    {Array.isArray(props.items) ? <></> : <Box className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleTransform}
                        >
                            GPT 변환
                        </Button>
                    </Box>}

                    {visible ? (
                        <Box className={classes.resultContainer}>
                            <Box
                                className={`${classes.resultBox} ${isSelected("result1") ? classes.selectedBox : ''}`}
                                onClick={() => handleResultSelection("result1")}
                            >
                                <Typography variant="subtitle1">원본</Typography>
                                <Typography variant="body2">{result1}</Typography>
                            </Box>
                            <Box
                                className={`${classes.resultBox} ${isSelected("result2") ? classes.selectedBox : ''}`}
                                onClick={() => handleResultSelection("result2")}
                            >
                                <Typography variant="subtitle1">GPT-4</Typography>
                                <Typography variant="body2">{result2}</Typography>
                            </Box>
                        </Box>
                    ) : (
                       ""
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUseCaseModalClose} color="secondary">
                        닫기
                    </Button>
                    {visible ?
                    <Button onClick={handleUseCaseSave} color="primary">
                        저장하기
                    </Button> : <></>}
                    {Array.isArray(props.items) ?  <Button onClick={handleUseCaseSave} color="primary">
                        저장하기
                    </Button> : <></>}
                </DialogActions>
            </Dialog>
        </>
    );
}


