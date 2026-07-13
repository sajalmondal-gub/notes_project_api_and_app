import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

export type MainStackParamList = {
    NotesScreen: undefined;
    CreateNote: undefined;
    EditNote: { noteId: string };
    NoteDetail: { noteId: string };
    SearchScreen: undefined;
};

export type RootStackParamList = {
    Splash: undefined;
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Main: NavigatorScreenParams<MainStackParamList>;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}