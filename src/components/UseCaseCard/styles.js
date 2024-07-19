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
  textFieldCustom: {
    marginBottom: theme.spacing(2),
  },
  dialogContent: {
    minWidth: '600px', // 원하는 최소 너비로 설정
  },
  questionTitle: {
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
  },
  resultContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  // resultBox: {
  //   flex: 1,
  //   border: `1px solid ${theme.palette.divider}`,
  //   borderRadius: theme.shape.borderRadius,
  //   padding: theme.spacing(2),
  //   position: 'relative',
  // },
  additionalText: {
    marginTop: theme.spacing(2),
  },
  radioGroup: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  selectedBox: {
    backgroundColor: theme.palette.action.selected,
  },
  resultBox: {
    flex: 1,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    position: 'relative',
    cursor: 'pointer',
    // backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  scrollableGrid: {
    display: 'flex',
    height: "250px",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0 2px 5px ${theme.palette.divider}`,
    overflowX: 'auto',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  scrollableSection: {
    display: 'flex',
    overflowX: 'auto',
    gap: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  selectedResultBox: {
    flex: '0 0 200px',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    cursor: 'pointer',
  },
  menuCheckbox: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  menuImage: {
    // display: 'block',
    // width: '150px',
    // height: '150px',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    width: "150px",
    height: "150px",
    marginTop: "10px",
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }
}));
