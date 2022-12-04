import { useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GET_TRANSACTION } from "../../graphql/queries/getTransaction";
import { EditDialog } from "./components/EditDialog";
import { UPDATE_TRANSACTION } from "../../graphql/mutations/updateTransaction";
import {
  PageContainer,
  PageCard,
  Title,
  SubTitle,
  ColorfulPill,
} from "../../styles/page.styles";
import {
  Footer,
  InformationContainer,
  InformationTitle,
} from "./Transaction.styles";

function Transaction() {
  const { id } = useParams();
  const { data } = useQuery(GET_TRANSACTION, { variables: { id: id } });
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();

  const transaction = data?.transaction;
  const date = moment(transaction?.date).format("Do of MMM YYYY").toString();

  const closeDialog = (_, action, outputData) => {
    if (action === "submit" || action === "cancel") {
      submit(outputData);
    }
    setIsEditOpen(false);
  };

  const openDialog = () => {
    setIsEditOpen(true);
  };

  const submit = (outputData) => {
    updateTransaction({
      variables: {
        id: id,
        ...outputData,
      },
    });
  };

  return (
    <>
      {transaction && (
        <PageContainer>
          <PageCard>
            <Title>Transaction</Title>
            <SubTitle>
              {transaction.reference || "No reference provided"}
            </SubTitle>
            <div css={{ display: "flex", flexDirection: "column" }}>
              <InformationContainer>
                <InformationTitle>
                  <PersonIcon />
                  <span>Name</span>
                </InformationTitle>
                <span>{transaction.account.name}</span>
              </InformationContainer>
              <InformationContainer>
                <InformationTitle>
                  <AttachMoneyIcon />
                  <span>Amount</span>
                </InformationTitle>
                <span>
                  {transaction.amount} {transaction.currency}
                </span>
              </InformationContainer>
              <InformationContainer>
                <InformationTitle>
                  <EventIcon />
                  <span>Date</span>
                </InformationTitle>
                <span>{date}</span>
              </InformationContainer>
              <InformationContainer>
                <InformationTitle>
                  <CategoryIcon />
                  <span>Category</span>
                </InformationTitle>
                <div>
                  <IconButton aria-label="edit category" onClick={openDialog}>
                    <EditIcon />
                  </IconButton>
                  <ColorfulPill color={transaction.category.color}>
                    {transaction.category.name}
                  </ColorfulPill>
                </div>
                <EditDialog open={isEditOpen} onClose={closeDialog} />
              </InformationContainer>
              <InformationContainer>
                <InformationTitle>
                  <AccountBalanceIcon />
                  <span>Bank</span>
                </InformationTitle>
                <span>{transaction.account.bank}</span>
              </InformationContainer>
            </div>
            <Footer>
              <Button
                aria-label="return to previous page"
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Footer>
          </PageCard>
        </PageContainer>
      )}
    </>
  );
}

export default Transaction;
