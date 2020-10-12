const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000))

export const getProfile = async (id: number) => {
    await sleep()

    return {
        id,
        name: 'Jacques Blom',
        twitter: '@jacques_codes',
        website: 'https://jacquesblom.com',
    }
}
