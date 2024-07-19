import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    tableContainer: {
        flexGrow: 1, /* 남은 공간을 모두 채우도록 설정 */
        display: "inline-block", /* 이미지와 테이블을 같은 줄에 표시 */
        verticalAlign: "middle", /* 중앙 정렬 */
        marginLeft: "20px"
    },
    rightAlignContainer: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "20px"
    },
}));
