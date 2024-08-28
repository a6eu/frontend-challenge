import React from 'react';

type MainContainerProps = {
    children: React.ReactNode;
}

const MainContainer = (props: MainContainerProps) => {
    return (
        <main>
            <div className={"w-full flex justify-center min-h-[calc(100vh-176px-92px-1rem)]"}>
                <div className={"max-w-screen-xl w-full px-2"}>
                    {props.children}
                </div>
            </div>
        </main>
    );
};

export default MainContainer;