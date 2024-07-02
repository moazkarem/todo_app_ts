interface Iprops {
  msg?: string;
}
const Errormsg = ({ msg }: Iprops) => {
  return msg?<span className="p-2 text-red-600 ">{msg}</span>:null
};

export default Errormsg;
