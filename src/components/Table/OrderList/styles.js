// src/styles.js
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    table: {
        // minWidth: 650,
    },
    tableRow: {
        '&:hover': {
            backgroundColor: '#f5f5f5', // Hover 시 배경 색상 변경
        }
    },
    dialogContent: {
        padding: theme.spacing(2),
        // position: 'relative',
        // overflow: 'auto',
        maxHeight: '400px', // 적당한 높이 설정
        // minWidth: "500px",
        overflowY: 'auto',
        overflowX: 'hidden',
        minWidth: "500px",
        backgroundColor: '#EFF9FF',
    },
    bubble: {
        maxWidth: '80%',
        minWidth: '100px', // 최소 크기 설정
        margin: theme.spacing(1),
        padding: theme.spacing(1, 2),
        borderRadius: '20px',
        width: "auto",
        backgroundColor: '#f0f0f0',
    },
    rightBubble: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#00A3FF',
        marginLeft: 'auto', // 오른쪽 정렬
    },
    leftBubble: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // 더 부드러운 그림자
        backgroundColor: '#ffffff',
        display:"block"
    },
    iconColor: {
        color: "#00A3FF"
    },
    text_white: {
        color: "#ffffff",
    },
    dFlex: {
        display: "flex",
        width: '100%',
    },
    content: {
        flex: "1 1 auto",
    },
    scrollContainer: {
        display: 'flex',
        overflowX: 'auto',
        // marginBottom: theme.spacing(1),
        '&::-webkit-scrollbar': {
            height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'darkgrey',
            borderRadius: '10px',
        }
    },
    text_padding: {
        padding: "3px 5px 0px 10px"
    }
}));

export default useStyles;