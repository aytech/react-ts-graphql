import { useReducer } from 'react'
import { server } from './server'

interface State<TData> {
  data: TData | null
  error: boolean
  loading: boolean
}

type Action<TData> =
  | { type: 'FETCH' }
  | { type: 'FETCH_SUCCESS', payload: TData }
  | { type: 'FETCH_ERROR' }

type MutationTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
]

const reducer = <TData>() => (
  state: State<TData>,
  action: Action<TData>
): State<TData> => {
  switch (action.type) {
    case 'FETCH':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_SUCCESS':
      return {
        data: action.payload,
        error: false,
        loading: false
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        error: true,
        loading: false
      }
    default:
      throw new Error()
  }
}

export const useMutation = <TData = any, TVariables = any>(
  query: string
): MutationTuple<TData, TVariables> => {

  const fetchReducer = reducer<TData>()
  const [ state, dispatch ] = useReducer(fetchReducer, {
    data: null,
    error: false,
    loading: false
  })

  const fetch = async (variables?: TVariables) => {
    try {
      dispatch({ type: 'FETCH' })
      const { data, errors } = await server.fetch<TData, TVariables>({ query, variables })
      if (errors && errors.length > 0) {
        throw new Error(errors[ 0 ].message)
      }
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (error) {
      console.error(error);
      dispatch({ type: 'FETCH_ERROR' })
    }
  }
  return [ fetch, state ]
}