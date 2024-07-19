import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    tableContainer: {
        backgroundColor: "white",
        boxShadow:'0px 3px 11px 0px #E8EAFC,0 3px 3px -2px #B2B2B21A,0 1px 8px 0 #9A9A9A1A',
        padding: theme.spacing(2), // 내부 여백 설정
        paddingTop : "70px",
        position: 'relative', // 버튼의 절대 위치를 위해 relative 설정
    },
    categoryManageButton: {
        position: 'absolute', // 컨테이너 기준 절대 위치
        top: theme.spacing(2), // 상단에서 16px (theme.spacing(2)의 기본값은 8)
        right: theme.spacing(2) + 200, // 왼쪽에서 16px
    },
    addButton: {
        position: 'absolute', // 컨테이너 기준 절대 위치
        top: theme.spacing(2), // 상단에서 16px (theme.spacing(2)의 기본값은 8)
        right: theme.spacing(2) + 100, // 왼쪽에서 16px
    },
    saveButton: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2) , // '추가하기' 버튼의 너비를 고려하여 위치 조정
    },
    formControl: {
        position: 'absolute',
        width: "100px",
        top: theme.spacing(2),
        left: theme.spacing(2), // '추가하기' 버튼의 너비를 고려하여 위치 조정
    },
    newImageContainer:{
        position: 'relative',
        width: "auto",
        maxWidth: '200px',
        height: '200px',
        alignContent: "center"
    },
    newImage: {
        width: '200px',
        height: '200px',
        border: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: "6px",
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    uploadBtn: {
        position: 'absolute',
        bottom: '10px', // 버튼의 위치를 이미지 아래쪽에 배치
        right: '10px', // 버튼의 위치를 이미지 오른쪽에 배치
        background: 'white', // 버튼의 배경색
        borderRadius: '10%', // 버튼을 원형으로 만듬
        cursor: 'pointer' // 마우스 오버 시 커서를 손가락 모양으로 변경
    },
    textFieldCustom: {
        marginTop: "10px",
        marginBottom: "10px"
    },
    textCenter: {
        textAlign: "center"
    },
    textNowrap: {
        whiteSpace: "nowrap"
    },
    minWidth300: {
        minWidth: "300px"
    }
}));