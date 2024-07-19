import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    rightAlignContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "30px"
    },
    imageContainer: {
        width: "200px",
        height: "200px",
        display: "inline-block", /* 이미지와 테이블을 같은 줄에 표시 */
        verticalAlign: "middle", /* 중앙 정렬 */
    },
    image: {
        width: "200px",
        height: "200px",
        border: '1px solid #ddd',
        borderRadius: '6px', // 부드러운 모서리 효과를 위해 borderRadius 추가
        backgroundSize: "cover", /* 이미지 크기가 컨테이너를 꽉 채우도록 */
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundPosition: 'center',
        color: "#ffffff" /* 이미지 업로드 텍스트 색상 */
    },
    tableContainer: {
        flexGrow: 1, /* 남은 공간을 모두 채우도록 설정 */
        display: "inline-block", /* 이미지와 테이블을 같은 줄에 표시 */
        verticalAlign: "middle", /* 중앙 정렬 */
        marginLeft: "20px"
    },
    tableHeaderCell: {
        fontWeight: "bold"
    },
    flexContainer: {
        display: "flex",
        flexDirection: "row", /* 자식 요소들을 가로로 배치 */
        width: "100%" /* 전체 너비 */
    },
    aiTextSection: {
        flexGrow: 1,
        display: 'flex',
        height: "140px",
        flexDirection: 'column', // 컨텐츠를 수직 방향으로 정렬합니다.
        alignItems: 'center', // 수평 중앙에 배치합니다.
        padding: '20px',
        overflow: 'auto', // 컨텐츠가 넘칠 경우 스크롤바 생성
        maxHeight: 'calc(100% - 40px)', // 최대 높이를 설정하여 스크롤 내부적으로만 발생하도록 합니다.
        whiteSpace: "pre-wrap"
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
        marginTop: "20px",
        marginBottom: "20px"
    }
}));
