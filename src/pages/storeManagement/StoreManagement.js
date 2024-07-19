import React, {useEffect, useState} from "react";
import {
    Grid,
    TextField,
    Button,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import useStyles from "./styles";
import CollectionsIcon from "@material-ui/icons/Collections";
import {
    fetchBusinessInfo,
    useBusinessUpdateMutation,
    useImageUploadMutation
} from '../../api/mutations.js'
import {useQuery} from "react-query";

export default function StoreManagement() {
    const classes = useStyles();
    const { data: businessInfo, isLoading : businessInfoIsLoading, isError: businessInfoIsError } = useQuery('businessInfo', fetchBusinessInfo);
    // const { data: businessItemsInfo, isLoading : businessItemsInfoIsLoading, isError: businessItemsInfoIsError } = useQuery('businessItemsInfo', fetchBusinessItemsInfo);
    // useState 훅을 사용하여 매장데이터 상태를 관리합니다.
    const [storeData, setStoreData] = useState({
        imageUrl:'',
        name:'',
        description:'',
        prompt:''
    })
    // 업데이트할 storeData 내용
    const [storeUpdateData, setStoreUpdateData] = useState({
        imageUrl:'',
        name:'',
        description:'',
        prompt:''
    })
    const handleBusinessUpdateSuccess = (businessData) => {
        // 매장 아이템 리스트 업데이트 성공시
        //console.log('BusinessItemsUpdate successful:', businessData);
        // 업로드 성공 시 처리 로직

    };
    const handleBusinessUpdateError = (error) => {
        //console.error('BusinessItemsUpdate failed:', error);
        // 업로드 실패 시 처리 로직
    };
    // 매장 생성
    const {
        mutate: businessUpdateMutation,
    } = useBusinessUpdateMutation(
        handleBusinessUpdateSuccess,
        handleBusinessUpdateError
    );
    const handleImageUploadSuccess = (uploadImageData) => {
        // 로그인 성공 후 처리할 로직
        //console.log('이미지업로드 성공:', uploadImageData);
        // setNewImage(uploadImageData.imageUrl);
        setStoreUpdateData({ ...storeUpdateData, imageUrl: uploadImageData.imageUrl });
    };
    const handleImageUploadError = (error) => {
        // 로그인 실패 후 처리할 로직
        //console.error('Upload failed:', error);
    };
    // 이미지 업로드
    const {
        mutate: uploadImageMutation,
    } = useImageUploadMutation(
        handleImageUploadSuccess,
        handleImageUploadError
    );
    useEffect(() => {
        if (!businessInfoIsLoading && !businessInfoIsError && businessInfo) {
            // 데이터가 로드되었고, 에러가 없을 경우 상태 업데이트
            setStoreData(businessInfo.data);
            setStoreUpdateData(businessInfo.data);
        }
    }, [businessInfo, businessInfoIsLoading, businessInfoIsError]); // 의존성 배열에 businessInfo, isLoading, isError를 추가
    const [open, setOpen] = useState(false); // 모달 상태
    const handleSave = () => {
        if(window.confirm("저장하시겠습니까?")) {
            setStoreData(storeUpdateData)
            setOpen(false)
        }
        businessUpdateMutation(storeUpdateData)
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        uploadImageMutation(formData)
    };
    const handleModalOpen = () => {
        setOpen(true);
    };
    // 모달 닫기
    const handleModalClose = () => {
        setStoreUpdateData(storeData)
        setOpen(false);
    };
    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setStoreUpdateData({ ...storeUpdateData, [name]: value });
    };
    return (
        <div>
            <PageTitle title="매장 관리하기" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget disableWidgetMenu>
                        <input
                            accept="image/*"
                            style={{display: 'none'}}
                            id="raised-button-file"
                            name="imageUrl"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <div className={classes.flexContainer}>
                            <div className={classes.imageContainer}>
                                {/* 이미지 미리보기 */}
                                <div className={classes.image}
                                     style={{
                                         backgroundImage: `url(${storeData.imageUrl})`,
                                     }}
                                >
                                    {!storeData.imageUrl && '이미지 업로드'}
                                </div>
                            </div>
                            <Paper className={classes.tableContainer}>
                                <div className={classes.tableSection}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center"
                                                           className={classes.tableHeaderCell}>매장명</TableCell>
                                                <TableCell align="center">{storeData.name}</TableCell>
                                                <TableCell align="center"
                                                           className={classes.tableHeaderCell}>지점</TableCell>
                                                <TableCell align="center">{storeData.description}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className={classes.aiTextSection}>
                                    {storeData.prompt}
                                </div>
                            </Paper>
                        </div>
                        <div className={classes.rightAlignContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleModalOpen}
                            >
                                수정하기
                            </Button>
                        </div>
                    </Widget>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleModalClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">매장 관리하기</DialogTitle>
                <DialogContent>
                    {/* 이미지 업로드 필드 */}
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center", // 수평 중앙 정렬
                    }}>
                        <input
                            accept="image/*"
                            style={{display: 'none'}}
                            id="raised-button-file"
                            name="imageUrl"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <div className={classes.newImageContainer}>
                            {/* 이미지 미리보기 */}
                            <div
                                className={classes.newImage}
                                style={{
                                    backgroundImage: `url(${storeUpdateData.imageUrl})`,
                                }}
                            >
                                {!storeUpdateData.imageUrl && '이미지 업로드'}
                            </div>
                            {/* 이미지 업로드 버튼 */}
                            <label htmlFor="raised-button-file" className={classes.uploadBtn}>
                                <Button variant="contained" component="span" style={{padding: 0, minWidth: 0}}>
                                    <CollectionsIcon/>
                                </Button>
                            </label>
                        </div>
                    </div>
                    <TextField
                        margin="dense"
                        name="name"
                        label="매장명"
                        type="text"
                        variant="outlined"
                        value={storeUpdateData.name}
                        fullWidth
                        onChange={handleUpdateChange}
                        className={classes.textFieldCustom}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="지점"
                        type="text"
                        variant="outlined"
                        value={storeUpdateData.description}
                        fullWidth
                        onChange={handleUpdateChange}
                        className={classes.textFieldCustom}
                    />
                    <TextField
                        margin="dense"
                        label="키우미에서 매장을 설명해주세요."
                        type="text"
                        multiline
                        rows={6}
                        variant="outlined"
                        name="prompt"
                        value={storeUpdateData.prompt || ""}
                        onChange={handleUpdateChange}
                        fullWidth
                        className={classes.textFieldCustom}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="secondary">
                        취소하기
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        저장하기
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
