import journalApi from "@/Api/journalApi"

export const loadEntries = async({commit}) => {
    const {data} = await journalApi.get('/entries.json')
    if(!data){
        commit('setEntries', [])
        return
    }
    const entries = []
    for(let id of Object.keys(data)){
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries', entries)
}
export const updateEntry = async({commit}, entry) =>{
    const {id,text, date, picture} = entry
    let dataToSave = {date, text, picture}

    const data = await journalApi.put(`entries/${id}.json`, dataToSave)
    commit('updateEntry', {...entry})


}


export const createEntry = async({commit}, entry)=>{
     // dataToSave
     const { date, picture, text } = entry
     const dataToSave = { date, picture, text }
 
     const { data, status} = await journalApi.post( `entries.json`, dataToSave )
 
     dataToSave.id = data.name
     commit('addEntry', dataToSave )
 
     return data.name
     
}

export const deleteEntry = async({commit}, id)=>{

    const delet = await journalApi.delete(`entries/${id}.json`)
    commit('deleteEntry', id)

}