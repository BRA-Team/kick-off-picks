
import { useForm } from "react-hook-form"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Navigate, useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
 
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { roomActionCreators, questionActionCreators, State} from "@/_state";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"

import RoomSettings from "../components/RoomSettings"
import RoomQuestion from "../components/RoomQuestion"
import RoomStart from "../components/RoomStart"
import RoomMakeQuizz from "../components/RoomMakeQuizz"
import RoomFinal from "../components/RoomFinal"

const Room = () => {

    const { toast } = useToast()
    const [checkedErrors, setCheckedErrors] = useState(false);
    const [messageDisplay, setMessageDisplay] = useState(false);

    let params = useParams<{code: string}>();
    let code = '';
    params.code == undefined? code = '' : code = params.code;

    const [showMakeQuizz, setShowMakeQuizz] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [leavedRoom, setLeavedRoom] = useState(false);

    //------------------------------------------------------------------------------

    const dispatch = useDispatch();
    const { loadRoomDetails, leaveRoom } = bindActionCreators(roomActionCreators, dispatch);
    const { deleteQuestion, numberOfQuestions, checkFirstQuestion} = bindActionCreators(questionActionCreators, dispatch);

    const roomState = useSelector((state: State) => state.roomState);
    const { tournament, maxPlayers, votesToSkip, isRoomCreated, isJoinedRoom, isHost, roomStarted, errors} = roomState;

    const questionState = useSelector((state: State) => state.questionState);
    const { isFinal } = questionState;

    //------------------------------------------------------------------------------

    const form = useForm({
        defaultValues: {
            tournament: tournament,
            max_players: maxPlayers,
            votes_to_skip: votesToSkip,
          },
    });

    useEffect(() => {

        if(checkedErrors){
            for (let type in errors) {
                if(type === 'code' || errors[type].toString() ==='[object Object]')
                    continue;

                if(type === 'Room Not Found') {
                    toast({
                        title: "Load Room Failed!",
                        variant: "destructive",
                        description: "This room no longer exist!",
                    });
                }

                toast({
                    title: "Load Room Failed!",
                    variant: "destructive",
                    description: errors[type].toString(),
                });
                console.log(errors[type]);
            }
            setCheckedErrors(false);
        }
      }, [errors]);

    useEffect(() => {
        
        loadRoomRequest();
        numberOfQuestions(code);
        checkFirstQuestion(code);

        setCheckedErrors(true);

        if(!messageDisplay) {

            if(isJoinedRoom){
                toast({
                    title: "Join Room Success!",
                    variant: "success",
                    description: `You have successfully joined room ${code}.`,
                });
                setMessageDisplay(true);
            }
            else if(isRoomCreated){
                toast({
                    title: "Room Created successfully!",
                    variant: "success",
                    description: "You can now invite your friends to join the room.",
                });
                setMessageDisplay(true);
            }
        }
      }, []);

    useEffect(() => {

        loadRoomRequest();

        // automaticaly load room details every 1 second
        // const intreval = setInterval(loadRoomRequest, 1000);
        // return () => {
        //     clearInterval(intreval);
        // };

    }, [roomStarted]);

    const loadRoomRequest = () => {
        try {

            loadRoomDetails(code);

        } catch(err) {
            toast({
                title: "Load Room Failed!",
                variant: "destructive",
                description: "This room no longer exist!", // Assuming the error object has a message property
            });
            console.error(err);
        }
    }

    const leaveRoomRequest = () => {
        try {

            leaveRoom();
            if(isHost) {
                deleteQuestion(code);
            }

            setLeavedRoom(true);
            setCheckedErrors(true);

        } catch(err) {
            toast({
                title: "Leave Room Failed!",
                variant: "destructive",
                description: "Something Wrong, try again",
            });
            console.error(err);
        }
    }

    
    const updateCallback = () => {
        setShowSettings(false);
    }

    const backCallback = () => {
        setShowMakeQuizz(false);
        setShowSettings(false);
    }

    const makeQuizzClick = () => {
        setShowMakeQuizz(!showMakeQuizz);
    }

    const settingsClick = () => {
        setShowSettings(!showSettings);
    }

    const leaveClick = () => {
        leaveRoomRequest();
        
        toast({
            title: "Leave Room Success!",
            variant: "success",
            description: `You have successfully leaved the room ${code}.`,
        });
    }

    if(leavedRoom) {
        return <Navigate to="/" />;
    }

    const renderRoomDetails = () => {
        return (
            <Form {...form}>
            <form 
              className="flex-center flex-col">

                <div className="flex flex-row mt-2">
                    <FormField
                    name="max_players"
                    render={() => (
                        <FormItem className="flex-center flex-col h-2/3">
                            <FormLabel className="shad-form_label">Max players</FormLabel>
                            <Input type="text" readOnly={true} className="shad-input text-center w-1/3" value={maxPlayers} />
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                    name="tournament"
                    render={() => (
                        <FormItem className="flex-center flex-col h-2/3">
                            <FormLabel className="shad-form_label">Tournament</FormLabel>
                            <Input type="text" readOnly={true} className="shad-input text-center w-40" value={tournament} />
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                    name="votes_to_skip"
                    render={() => (
                        <FormItem className="flex-center flex-col h-2/3">
                            <FormLabel className="shad-form_label">Votes to skip</FormLabel>
                            <Input type="text" readOnly={true} className="shad-input text-center w-1/3" value={votesToSkip} />
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
            </form>
            </Form>
        );
    }


    return (
    <div className="sm:w-420 flex-center flex-col gap-5">
        
        <div className="sm:w-420 flex-center flex-col">
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                {"ROOM: " + code}
            </h2>
            <p className="text-light-3 small-medium md:base-regular text-center mt-2">
                In this game, only the best emerge victorious.
            </p>
        </div>
        
        {/* ------------------------------------------------------- */}
        <div className="border-t-2 border-white w-full"></div>

        {showSettings ? (
            <RoomSettings updateCallback={updateCallback} backCallback={backCallback}/>
        ) : (
            roomStarted ? (

                isFinal ? (
                    <RoomFinal isHost={isHost}/>
                ) : (
                    <RoomQuestion />
                )

            ) : (
                showMakeQuizz ? (
                    <RoomMakeQuizz backCallback={backCallback}/>
                ) : (
                    <RoomStart isHost={isHost}/>
                )
            )
        )}

        <div className="border-t-2 border-white w-full"></div>
        {/* ------------------------------------------------------- */}

        <div className="flex flex-col flex-center gap-1">

            {isHost ? (
                <>
                    {renderRoomDetails()}

                    {roomStarted ? (
                        null
                    ) : (
                        <>
                            <Button type="button" 
                            className="shad-button_green w-420"
                            onClick={makeQuizzClick}
                            >
                                {showMakeQuizz ? "CLOSE MAKE QUIZZ" : "MAKE QUIZZ"}
                            </Button>

                            
                        </>
                    )}

                    <Button type="button" 
                    className={showSettings ? "shad-button_primary w-420" : "shad-button_primary w-420" } 
                    onClick={settingsClick}
                    >
                        {showSettings ? "CLOSE SETTINGS" : "SHOW SETTINGS"}
                    </Button>
                
                </>
            ) : (<></>)}

            <Button type="button" 
            className="shad-button_red w-420"
            onClick={leaveClick}
            >
                LEAVE ROOM
            </Button>

        </div>

       
        
        

    </div>
    )
}

export default Room;