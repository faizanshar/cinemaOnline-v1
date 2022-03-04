import { useState, useEffect } from "react";
import { Col, Container, Dropdown } from "react-bootstrap";
import ContentCss from "./Content.module.css";
import { API } from "../../config/api";

// icons/images
import blueArrow from "../../public/icons/bluearrow.png";

export default function AdminContent() {
  const [transaction, setTransaction] = useState();
  const [status, setStatus] = useState(1);

  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions");
      // console.log(response.data.data.transaction);
      setTransaction(response.data.data.transaction);
    } catch (error) {
      console.log(error);
    }
  };

  const approve = async (id) => {
    try {
      const response = await API.patch(`/approve/${id}`);
      getTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = async (id) => {
    try {
      const response = await API.patch(`/cancel/${id}`);
      getTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <Container>
      <h3 className="mt-3">Incoming Transaction</h3>
      <Col xs={12}>
        <TableData
          status={status}
          approve={approve}
          cancel={cancel}
          transaction={transaction}
        />
      </Col>
    </Container>
  );
}

const TableData = (props) => {
  const { status, transaction, cancel, approve } = props;
  // console.log("ini table");
  // console.log(transaction);
  return (
    <table>
      <thead>
        <tr>
          <th className={ContentCss.thNo}>No</th>
          <th className={ContentCss.thUsers}>Users</th>
          <th className={ContentCss.thBukti}>Bukti Transfer</th>
          <th className={ContentCss.thFilm}>Film</th>
          <th className={ContentCss.thNumber}>Number Account</th>
          <th className={ContentCss.thStatus}>Status Payment</th>
          <th className={ContentCss.thAction}>Action</th>
        </tr>
      </thead>
      <tbody>
        {transaction?.map((item, index) => {
          if ((index + 1) % 2 != 0) {
            return (
              <tr className={ContentCss.Group1}>
                <td className={ContentCss.thNo}>{index + 1}</td>
                <td className={ContentCss.thUsers}>{item?.user.fullName}</td>
                <td className={ContentCss.thBukti}>{item?.transferProof}</td>
                <td className={ContentCss.thFilm}>{item?.film.title}</td>
                <td className={ContentCss.thNumber}>{item?.accountNumber}</td>
                <TdStatus status={item.status} />
                {item?.status == "pending" ? (
                  <TdAction approve={approve} id={item?.id} cancel={cancel} />
                ) : (
                  <div></div>
                )}
              </tr>
            );
          } else if ((index + 1) % 2 == 0) {
            return (
              <tr className={ContentCss.Group2}>
                <td className={ContentCss.thNo}>{index + 1}</td>
                <td className={ContentCss.thUsers}>{item?.user.fullName}</td>
                <td className={ContentCss.thBukti}>{item?.transferProof}</td>
                <td className={ContentCss.thFilm}>{item?.film.title}</td>
                <td className={ContentCss.thNumber}>{item?.accountNumber}</td>
                <TdStatus status={item.status} />
                {item?.status == "pending" ? (
                  <TdAction approve={approve} id={item?.id} cancel={cancel} />
                ) : (
                  <div></div>
                )}
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

const TdStatus = (props) => {
  const { status } = props;
  return (
    <>
      {(() => {
        if (status == "pending") {
          return (
            <td
              style={{ color: "rgba(247, 148, 30, 1)", fontWeight: "500" }}
              className={ContentCss.thStatus}
            >
              Pending
            </td>
          );
        } else if (status == "approve") {
          return (
            <td
              style={{ color: "rgba(10, 207, 131, 1)", fontWeight: "500" }}
              className={ContentCss.thStatus}
            >
              Approve
            </td>
          );
        } else {
          return (
            <td
              style={{ color: "rgba(255, 7, 66, 1)", fontWeight: "500" }}
              className={ContentCss.thStatus}
            >
              Cancel
            </td>
          );
        }
      })()}
    </>
  );
};

const TdAction = (props) => {
  const { approve, cancel, id } = props;
  return (
    <td className={ContentCss.thAction}>
      <Dropdown>
        <Dropdown.Toggle variant="link" bsPrefix="p-0">
          <div>
            <img src={blueArrow} />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ backgroundColor: "rgba(13, 13, 13, 1)" }}>
          <Dropdown.Item
            style={{ color: "rgba(10, 207, 131, 1)" }}
            onClick={() => approve(id)}
          >
            Approve
          </Dropdown.Item>
          <Dropdown.Item
            style={{ color: "rgba(255, 0, 0, 1)" }}
            onClick={() => cancel(id)}
          >
            Cancel
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </td>
  );
};
