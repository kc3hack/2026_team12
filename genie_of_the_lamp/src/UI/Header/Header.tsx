interface IHeader {
  backStart: () => void;
  backQuestion: () => void;
}

const Header = ({ backStart, backQuestion }: IHeader) => {
  return (
    <>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <button onClick={backStart}>スタート画面に戻る</button>
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={backQuestion}>質問を戻る</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Header;
