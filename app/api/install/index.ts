import { toast } from 'react-hot-toast';
import {serverAxiosClient} from '../axiosClient'

const installApi = {
  testConnect: async () => {
    const response = await serverAxiosClient.get(``)

    return response
  },
}

export default installApi
