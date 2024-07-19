import React from "react";
import {
    Typography,
    Card, CardContent,
    // IconButton
} from "@material-ui/core";
// import DeleteIcon from '@material-ui/icons/Delete';
// import {ExpandMore, Favorite, MoreVert, Share} from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import {useUserDispatch} from "../../context/UserContext"; // useHistory 훅 임포트
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    card: {
        maxWidth: 500, // 원하는 카드의 최대 너비를 설정하세요
        border: '1px solid #ddd', // 카드 테두리
        borderRadius: 16, // 카드 모서리의 둥근 정도
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // 그림자 효과
        position: 'relative'
    },
    title: {
        fontSize: 14,
        marginTop: "20px"
    },
    pos: {
        marginBottom: 12,
    },
    imageContainer: {
        width: '100%', // 컨테이너의 너비를 부모 요소의 100%로 설정
        paddingTop: '100%', // 너비와 동일한 비율로 높이 설정하여 1:1 비율 만듦
        position: 'relative', // 이미지 위치 조정을 위한 상대 위치 설정
        overflow: 'hidden', // 컨테이너를 넘어가는 이미지 숨김 처리
        borderRadius: '4px', // 부드러운 모서리 효과를 위해 borderRadius 추가
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)', // 이미지 주위에 자연스러운 테두리를 만들기 위한 그림자 효과
    },
    image: {
        position: 'absolute', // 컨테이너 내에서 절대 위치 설정
        top: 0,
        left: 0,
        width: '100%', // 이미지 너비를 컨테이너의 100%로 설정
        height: '100%', // 이미지 높이를 컨테이너의 100%로 설정
        objectFit: 'cover', // 컨테이너를 가득 채우면서 이미지의 비율 유지
    },
    content: {
        padding: '32px', // 내부 여백
    },
    deleteButton: {
        position: 'absolute', // 버튼을 카드의 상대적 위치에서 절대적 위치로 이동
        top: 0, // 상단에서부터의 위치
        right: 0, // 좌측에서부터의 위치
        zIndex: 1, // 다른 컨텐츠 위에 위치
    },
});
function CustomCard({ id, imageUrl, name, description, date, updateCard }) {
    const history = useHistory(); // useHistory 훅을 사용하여 history 객체 얻기
    var userDispatch = useUserDispatch();
    const classes = useStyles();
    // const handleDelete = (event) => {
    //     event.stopPropagation()
    //     console.log("삭제를 위한 토글버튼")
    // }
    const handleCompanyClick = () => {
        localStorage.setItem('company_id', id)
        userDispatch({ type: 'LOGIN_SUCCESS' })
        history.push('/app/dashboard')
    };
    return (
        <Card className={classes.card} onClick={handleCompanyClick}>
            {/* 삭제 버튼 */}
            {/*<IconButton*/}
            {/*    className={classes.deleteButton}*/}
            {/*    onClick={(e) => {*/}
            {/*        e.stopPropagation();*/}
            {/*        handleDelete();*/}
            {/*    }}*/}
            {/*    aria-label="delete"*/}
            {/*>*/}
            {/*    <DeleteIcon />*/}
            {/*</IconButton>*/}
            <CardContent className={classes.content}>
                {/* 이미지 컨테이너 */}
                <div className={classes.imageContainer}>
                    {/* 이미지를 여기에 넣으세요. 아래는 예시 이미지입니다. */}
                    <img className={classes.image} src={imageUrl} alt="미도인" />
                </div>
                {/* 카드 제목 */}
                <Typography className={classes.title} gutterBottom>
                    {name}
                </Typography>
                {/* 카드 부가 내용 */}
                <Typography variant="body2" component="p" color="textSecondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CustomCard;