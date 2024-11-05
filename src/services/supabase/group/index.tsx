import { storage } from '@/services/storage/mmkvStorage'
import { supabase } from '@/services/supabase'

export const getUserId = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error('Erro export getUserId')
    throw error
  } else {
    const userId = await user?.id
    return userId
  }
}

export const getGroupId = async () => {
  const userId = await getUserId()
  const { data: group, error } = await supabase
    .from('profiles')
    .select('group_id')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Erro export getGroupId')
    throw error
  } else {
    const id = await group?.group_id
    return id
  }
}

export async function GetSaveGroupInformation() {
  let groupId: string | undefined
  let groupExpenses: string | undefined
  let groupAccountDivision: string | undefined
  let groupSalaries: string | undefined
  let groupName: string | undefined
  let groupMemberOneId: string | undefined
  let groupMemberOneName: string | undefined
  let groupMemberTwoId: string | undefined
  let groupMemberTwoName: string | undefined

  const userId = await getUserId()

  const getGroupId = async () => {
    const { data: group, error } = await supabase
      .from('profiles')
      .select('group_id')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Erro getGroupId')
      throw error
    } else {
      const id = await group?.group_id
      groupId = id
    }
  }

  const getGroupExpenses = async () => {
    const { data: expense, error } = await supabase
      .from('groups')
      .select('expenses')
      .eq('id', groupId)
      .single()

    if (error) {
      console.error('Erro getGroupExpenses')
      throw error
    } else {
      const data = await expense?.expenses
      groupExpenses = data
    }
  }

  const getAccountDivision = async () => {
    const { data: division, error } = await supabase
      .from('groups')
      .select('account_division')
      .eq('id', groupId)
      .single()

    if (error) {
      console.error('Erro getAccountDivision')
      throw error
    } else {
      const dataDivision = await division?.account_division
      groupAccountDivision = dataDivision
    }
  }

  const getGroupSalaries = async () => {
    const { data: salaries, error } = await supabase
      .from('groups')
      .select('salaries')
      .eq('id', groupId)
      .single()

    if (error) {
      console.error('Erro getGroupSalaries')
      throw error
    } else {
      const salariesGroup = await salaries?.salaries
      groupSalaries = salariesGroup
    }
  }

  const getGroupName = async () => {
    const { data: name, error } = await supabase
      .from('groups')
      .select('name')
      .eq('id', groupId)
      .single()

    if (error) {
      console.error('Erro getGroupName')
      throw error
    } else {
      const data = await name?.name
      groupName = data
    }
  }

  const getGroupIdMemberOne = async () => {
    const { data: name, error } = await supabase
      .from('groups')
      .select('member_1')
      .eq('id', groupId)
      .single()

    if (error) {
      console.error('Erro getGroupIdMemberOne')
      throw error
    } else {
      const memberOne = await name?.member_1
      groupMemberOneId = memberOne
      return memberOne
    }
  }

  const getGroupNameMemberOne = async () => {
    const idMember = await getGroupIdMemberOne()

    if (idMember !== null) {
      const { data: name, error } = await supabase
        .from('profiles')
        .select('first_name')
        .eq('id', idMember)
        .single()

      if (error) {
        console.error('Erro getGroupNameMemberOne')
        throw error
      } else {
        const first = await name?.first_name
        groupMemberOneName = first
      }
    } else {
      return null
    }
  }

  const getGroupIdMemberTwo = async () => {
    const { data: name, error } = await supabase
      .from('groups')
      .select('member_2')
      .eq('id', groupId)
      .single()

    if (error) {
      console.error('Erro getGroupIdMemberTwo')
      throw error
    } else {
      const memberTwo = await name?.member_2
      groupMemberTwoId = memberTwo
      return memberTwo
    }
  }

  const getGroupNameMemberTwo = async () => {
    const idMember = await getGroupIdMemberTwo()

    if (idMember !== null) {
      const { data: name, error } = await supabase
        .from('profiles')
        .select('first_name')
        .eq('id', idMember)
        .single()

      if (error) {
        console.error('Erro getGroupNameMemberTwo')
        throw error
      } else {
        const memberTwo = await name?.first_name
        groupMemberTwoName = memberTwo
      }
    } else {
      return null
    }
  }

  const handleSave = async () => {
    await getGroupId()
    await getGroupExpenses()
    await getAccountDivision()
    await getGroupSalaries()
    await getGroupName()
    await getGroupIdMemberOne()
    await getGroupNameMemberOne()
    await getGroupIdMemberTwo()
    await getGroupNameMemberTwo()
    storage.set(
      'group',
      JSON.stringify({
        groupId,
        groupExpenses,
        groupAccountDivision,
        groupSalaries,
        groupName,
        groupMemberOneId,
        groupMemberOneName,
        groupMemberTwoId,
        groupMemberTwoName,
      }),
    )
  }
  await handleSave()
}
