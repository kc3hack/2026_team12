interface IHeader {
  backStart: () => void;
  backQuestion: () => void;
}

const Header = ({ backStart, backQuestion }: IHeader) => {
  const buttonCSS = {
    padding:"0.5rem",
    border:"thick double #98882e",
    color:"#000000",
    background:"#ffffdc",
    borderRadius:"0.5rem",
    margin:"0.4rem",
    boxShadow: "8px 8px 2px 1px rgb(0 0 255 / 0.2)",
  }
  return (
    <>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <button 
                  onClick={backStart}
                  style={buttonCSS}
                >
                  スタート画面に戻る
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button
                  style={buttonCSS}
                  onClick={backQuestion}>
                  質問を戻る
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Header;
