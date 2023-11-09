import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../../styles/dashboard/templatecomp.css";
import { samhitacontract } from "../../ContractAddresses";
import SamhitaABI from "../../Samhita Artifacts/samhita.json";

function Templatecomp() {
  const location = useLocation();
  const { state } = location;
  console.log(location);
  console.log("IsSamhita:", state.isSamhita);
  console.log("Dao Address", state.daoAddress);
  const { id } = useParams();
  const [isSamhita, setIsSamhita] = useState(false);
  const [daoAddress, setDaoAddress] = useState(null);
  const [allProposals, setAllProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const displayallproposal = async () => {
    console.log("Entering into display all samhita proposal function");
    setIsLoading(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        if (chainId === 1029) {
          const contract = new ethers.Contract(
            samhitacontract,
            SamhitaABI.abi,
            signer
          );
          const proposalCount = await contract.proposalCount();
          const allProposals = [];

          for (let i = 1; i <= proposalCount; i++) {
            const proposal = await contract.proposals(i);
            const basicData = await contract.proposalsBasicData(i);
            console.log(`File: ${basicData.proposalFile}`);

            allProposals.push({
              proposalId: i,
              title: basicData.title,
              description: basicData.description,
              fileLink: basicData.proposalFile,
            });
            console.log(proposal.startBlock);
            console.log(proposal.endBlock);
          }

          setAllProposals(allProposals);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      const { isSamhita, daoAddress } = state;
      setIsSamhita(isSamhita);
      setDaoAddress(daoAddress);
      displayallproposal();
    }
  }, [state]);

  const data = allProposals.map((proposal, index) => ({
    number: index + 1,
    title: proposal.title,
    description: proposal.description,
    fileLink: proposal.fileLink,
  }));

  return (
    <div>
      <div className="outer-div-of-template-comp">
        <div className="inner-div-of-template-comp">
          <div className="heading-div-of-template-comp">Template</div>
          <div className="table-div-of-template-comp">
            <table className="my-special-table">
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "50%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="table-header-proposal-comp">Number</th>
                  <th className="table-header-proposal-comp">Title</th>
                  <th className="table-header-proposal-comp">Description</th>
                  <th className="table-header-proposal-comp">File Link</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.number}>
                    <td>{item.number}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <a
                        href={item.fileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        File Link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templatecomp;
