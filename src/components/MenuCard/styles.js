// src/styles.js
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    card: {
        minWidth: 200,  // 각 카드의 최소 너비
        maxWidth: 345,  // 각 카드의 최대 너비
        margin: theme.spacing(1),
    },
    media: {
        height: 140, // 고정 높이 제거하고 비율로 조절
        // paddingTop: '56.25%', // 16:9 비율로 설정
        padding: 10,
    },
    content: {
        padding: theme.spacing(2), // 패딩 조절
    },
}));

export default useStyles;