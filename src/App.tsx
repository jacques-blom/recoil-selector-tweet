import React, {Suspense} from 'react'
import './App.css'
import {atom, selector, useRecoilValue} from 'recoil'
import {getProfile} from './fakeApi'

const profileIdState = atom({
    key: 'profileId',
    default: 1,
})

const profileState = selector({
    key: 'profile',
    // ✨ The get function can be asynchronous
    //   (i.e. it can return a Promise)
    get: async ({get}) => {
        const profileId = get(profileIdState)

        const profile = await getProfile(profileId)
        return profile
    },
})

// ✨ This component will suspend while
//    profileState's async get function resolves
const Profile = () => {
    const profile = useRecoilValue(profileState)

    return (
        <div>
            <div>ID: {profile.id}</div>
            <div>Name: {profile.name}</div>
            <div>Twitter: {profile.twitter}</div>
            <div>Website: {profile.website}</div>
        </div>
    )
}

function App() {
    return (
        // ✨ Use a Suspense boundary to show a fallback while
        //   Profile suspends.
        <Suspense fallback={<div>Loading</div>}>
            <Profile />
        </Suspense>
    )
}

export default App
