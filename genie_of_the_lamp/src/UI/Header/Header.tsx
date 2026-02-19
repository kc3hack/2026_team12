interface IHeader {
  backStart: () => void;
  backQuestion: () => void;
}

const Header = ({ backStart, backQuestion }: IHeader) => {
  const buttonCSS = {
    padding:"0.5rem",
    border:"2px solid",
    color:"#ffffcc",
    background:"#444400",
    borderRadius:"0.5rem",
    margin:"0.4rem"
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
