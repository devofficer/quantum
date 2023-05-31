import { useEffect } from 'react';
import { NOPOINT_ENDPOINT } from 'constants/config';
import useStore from 'store';
import axios from 'axios';

const useProjectData = (projectId, quasarIdx) => {
  const { setProjectData, setActiveQuasar } = useStore((state) => state);

  useEffect(() => {
    axios
      .get(`${NOPOINT_ENDPOINT}${projectId}`)
      .then((res) => {
        setProjectData(res.data, quasarIdx);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    setActiveQuasar(quasarIdx);
  }, [quasarIdx, setActiveQuasar]);
};

export default useProjectData;
