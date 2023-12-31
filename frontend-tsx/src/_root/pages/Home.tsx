import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authActionCreators} from "@/_state";


const Home = () => {

  const dispatch = useDispatch();
  const { logout } = bindActionCreators(authActionCreators, dispatch);

  return (
    <>
      <h1 className='font-bold'>HOME</h1><br/>

      <Button type="submit" className="shad-button_red">
        <Link className="nav-link" to="/sign-in">SignIn</Link>
      </Button>

      <Button type="submit" className="shad-button_orange">
        <Link className="nav-link" to="/chat">Chat</Link>
      </Button>

      <Button type="submit" className="shad-button_blue">
        <Link className="nav-link" to="/rooms-home">Game</Link>
      </Button>

      <Button type="submit" className="shad-button_green" onClick={logout}>
        Log out
      </Button>
    </>
    
  )
}

export default Home