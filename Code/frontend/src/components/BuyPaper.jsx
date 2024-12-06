import {
  Typography,
  List,
  Card,
  Button,
  ListItem,
  ListItemPrefix,
  Chip,
  Radio,
} from "@material-tailwind/react";
import a4 from "../assets/a4.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdatePageMutation } from "../slices/authApiSlice";
import {
  useCreateBuyingLogMutation,
  useGetBuyingLogsByUserQuery,
} from "../slices/buyingLogApiSlice"; // Add this

// const QuantitySelector = ({ quantity, setQuantity }) => {
//   const decreaseQuantity = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const increaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <button
//         className="rounded-l border border-r-0 border-gray-400 bg-gray-200 px-4 py-2 hover:bg-gray-300"
//         onClick={decreaseQuantity}
//       >
//         -
//       </button>
//       <span className="border border-gray-400 px-4 py-2">{quantity}</span>
//       <button
//         className="rounded-r border border-l-0 border-gray-400 bg-gray-200 px-4 py-2 hover:bg-gray-300"
//         onClick={increaseQuantity}
//       >
//         +
//       </button>
//     </div>
//   );
// };

// const QuantitySelector = ({ quantity, setQuantity }) => {
//   const decreaseQuantity = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const increaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };

//   const handleInputChange = (e) => {
//     const value = parseInt(e.target.value, 10);
//     if (!isNaN(value) && value >= 0) {
//       setQuantity(value);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center gap-2">
//       <button
//         className="rounded-l border border-r-0 border-gray-400 bg-gray-200 px-4 py-2 hover:bg-gray-300"
//         onClick={decreaseQuantity}
//       >
//         -
//       </button>
//       <input
//         type="number"
//         min="0"
//         value={quantity}
//         onChange={handleInputChange}
//         className="w-16 border border-gray-400 px-2 text-center"
//       />
//       <button
//         className="rounded-r border border-l-0 border-gray-400 bg-gray-200 px-4 py-2 hover:bg-gray-300"
//         onClick={increaseQuantity}
//       >
//         +
//       </button>
//     </div>
//   );
// };

const QuantitySelector = ({
  quantity,
  onDecrease,
  onIncrease,
  onInputChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="rounded-l border border-r-0 border-gray-400 bg-gray-200 px-4 py-2 hover:bg-gray-300"
        onClick={onDecrease}
      >
        -
      </button>
      <input
        type="number"
        min="0"
        value={quantity}
        onChange={onInputChange}
        className="w-16 border border-gray-400 px-2 text-center"
      />
      <button
        className="rounded-r border border-l-0 border-gray-400 bg-gray-200 px-4 py-2 hover:bg-gray-300"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
};

const Invoice = ({ quantity, combo, comboList }) => {
  let total = quantity * 200;
  const comboItem = comboList[combo];
  if (combo !== null) {
    total += comboItem.price;
  }

  return (
    <div className="mx-0 flex w-3/4 flex-col">
      <table className="divide-slate-500 min-w-full divide-y">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-normal sm:pl-6 md:pl-0"
            >
              Description
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-right text-sm font-normal sm:table-cell"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-right text-sm font-normal sm:table-cell"
            >
              Rate
            </th>
            <th
              scope="col"
              className="py-3.5 pl-3 pr-4 text-right text-sm font-normal sm:pr-6 md:pr-0"
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {quantity > 0 ? (
            <tr className="border-slate-200 border-b">
              <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                <div className="font-medium">Paper</div>
              </td>
              <td className="hidden px-3 py-4 text-right text-sm sm:table-cell">
                {quantity}
              </td>
              <td className="hidden px-3 py-4 text-right text-sm sm:table-cell">
                200
              </td>
              <td className="py-4 pl-3 pr-4 text-right text-sm sm:pr-6 md:pr-0">
                {quantity * 200}
              </td>
            </tr>
          ) : null}
          {combo !== null ? (
            <tr className="border-slate-200 border-b">
              <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                <div className="font-medium">{comboItem.description}</div>
              </td>
              <td className="hidden px-3 py-4 text-right text-sm sm:table-cell">
                1
              </td>
              <td className="hidden px-3 py-4 text-right text-sm sm:table-cell">
                {comboItem.price}
              </td>
              <td className="py-4 pl-3 pr-4 text-right text-sm sm:pr-6 md:pr-0">
                {comboItem.price}
              </td>
            </tr>
          ) : null}
        </tbody>
        <tfoot>
          <tr>
            <th
              scope="row"
              colSpan="3"
              className="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal sm:table-cell md:pl-0"
            >
              Total
            </th>
            <th
              scope="row"
              className="pl-4 pr-3 pt-4 text-left text-sm font-normal sm:hidden"
            >
              Total
            </th>
            <td className="pl-3 pr-4 pt-4 text-right text-sm font-normal sm:pr-6 md:pr-0">
              đ{total}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const CustomListItem = ({ htmlForId, labelText, icon }) => {
  return (
    <ListItem className="border-2 border-solid border-[#dae2e8] p-0">
      <label
        htmlFor={htmlForId}
        className="flex w-full cursor-pointer items-center px-3 py-2"
      >
        {icon && <img src={icon} alt="icon" className="mr-3 h-6 w-6" />}
        <ListItemPrefix className="mr-3">
          <Radio
            name="vertical-list"
            id={htmlForId}
            ripple={false}
            className="hover:before:opacity-0"
            containerProps={{
              className: "p-0",
            }}
          />
        </ListItemPrefix>
        <Typography className="font-medium">{labelText}</Typography>
      </label>
    </ListItem>
  );
};

const CardItem = ({ title, price, discount, onClick }) => {
  return (
    <Button
      color="white"
      className="grid h-16 w-96 grid-cols-5 grid-rows-2 items-center gap-10"
      onClick={onClick}
    >
      <div className="col-span-3 row-span-2 flex flex-col justify-center ps-5">
        <Typography variant="h5">{title}</Typography>
        <Typography variant="small">{price}</Typography>
      </div>
      <Chip
        color="blue"
        value={`Decrease ${discount}`}
        className="text-md col-span-2 row-span-2 my-3 justify-self-center"
      />
    </Button>
  );
};

const BuyPaper = () => {
  const { pageBalance } = useSelector((state) => state.auth.userData);
  const [quantity, setQuantity] = useState(0);
  const [combo, setCombo] = useState(null);
  const [updatePage] = useUpdatePageMutation();
  const { _id: id } = useSelector((state) => state.auth.userData);

  const {
    data: buyingLogs = [],
    isLoading: isLogsLoading,
    error,
  } = useGetBuyingLogsByUserQuery();

  if (error) {
    console.error("Error fetching buying logs:", error);
  }

  const handleSetCombo = (c) => {
    if (combo === c) {
      setCombo(null);
    } else {
      setCombo(c);
    }
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(!isNaN(value) && value >= 0 ? value : 0);
  };

  const [createBuyingLog] = useCreateBuyingLogMutation();

  const handleSubmit = async () => {
    // const qty = combo !== null ? quantity + comboList[combo].pages : quantity;
    // await updatePage({ quantity: qty, id });
    // window.location.reload();

    const qty = combo !== null ? quantity + comboList[combo].pages : quantity;
    const totalAmount =
      combo !== null ? quantity * 200 + comboList[combo].price : quantity * 200;

    try {
      // Update page balance
      await updatePage({ quantity: qty, id });

      // Save buying log
      await createBuyingLog({
        userId: id,
        quantity,
        combo: combo !== null ? comboList[combo].description : null,
        totalAmount,
      }).unwrap();

      window.location.reload();
    } catch (error) {
      console.error("Error while processing the purchase:", error);
    }
  };

  const comboList = [
    {
      description: "Combo 100 A4",
      quantity: 1,
      pages: 100,
      price: 19000,
    },
    {
      description: "Combo 200 A4",
      quantity: 1,
      pages: 200,
      price: 36000,
    },
    {
      description: "Combo 500 A4",
      quantity: 1,
      pages: 500,
      price: 80000,
    },
  ];

  const paymentIcons = {
    bkpay:
      "https://upload.wikimedia.org/wikipedia/commons/d/de/HCMUT_official_logo.png",
    momo: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png",
    zalopay:
      "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png",
    vnpay:
      "https://vinadesign.vn/uploads/thumbnails/800/2023/05/vnpay-logo-vinadesign-25-12-59-16.jpg",
  };

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col gap-10 px-5">
        <div className="flex flex-col items-center gap-5">
          <Typography variant="h4">
            Remaining pages: {pageBalance} A4
          </Typography>
          <div className="flex flex-col gap-5 self-center">
            <figure className="flex flex-col items-center">
              <img src={a4} alt="a4" className="w-48" />
              <Typography
                as="caption"
                variant="small"
                className="mt-2 text-center font-normal"
              >
                Price: 200đ/ A4 pages
              </Typography>
            </figure>
            <div className="flex items-center gap-3">
              <Typography variant="h5">Quantities: </Typography>
              <QuantitySelector
                quantity={quantity}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
                onInputChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Typography variant="h5">Payment Methods</Typography>
          <List className="gap-3">
            <CustomListItem
              htmlForId="pay-with-bkpay"
              labelText="Payment Method: BKPay"
              icon={paymentIcons.bkpay}
            />
            <CustomListItem
              htmlForId="pay-with-momo"
              labelText="Payment Method: MoMo"
              icon={paymentIcons.momo}
            />
            <CustomListItem
              htmlForId="pay-with-zalopay"
              labelText="Payment Method: ZaloPay"
              icon={paymentIcons.zalopay}
            />
            <CustomListItem
              htmlForId="pay-with-vnpay"
              labelText="Payment Method: VNPay"
              icon={paymentIcons.vnpay}
            />
          </List>
        </div>
      </div>
      <div className="flex flex-col gap-5 border-l-2 border-l-blue-gray-200 pb-10 ps-5">
        <Card className="flex flex-col items-center gap-3 bg-[#d9d9d9] py-5">
          <Typography variant="h5" color="black">
            Promotion Package
          </Typography>
          <CardItem
            title="100 A4 pages"
            price="19.000đ"
            discount="5%"
            onClick={() => handleSetCombo(0)}
          />
          <CardItem
            title="200 A4 pages"
            price="36.000đ"
            discount="10%"
            onClick={() => handleSetCombo(1)}
          />
          <CardItem
            title="500 A4 pages"
            price="80.000đ"
            discount="20%"
            onClick={() => handleSetCombo(2)}
          />
        </Card>
        <Card className="flex flex-col items-center gap-3 bg-[#d9d9d9] py-5">
          <Typography variant="h5" color="black">
            Order
          </Typography>
          <Invoice quantity={quantity} comboList={comboList} combo={combo} />
        </Card>
        <Button color="blue" className="self-center" onClick={handleSubmit}>
          Buy Now
        </Button>
      </div>

      {/* <div className="order-history-section mt-10">
        <Typography variant="h4" color="black" className="mb-4">
          Order History
        </Typography>
        <Card className="bg-[#f4f4f4] p-5 shadow-md">
          {isLogsLoading ? (
            <Typography>Loading...</Typography>
          ) : buyingLogs.length === 0 ? (
            <Typography>No order history found.</Typography>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200 text-left text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-200 px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Combo</th>
                    <th className="border border-gray-200 px-4 py-2">
                      Total Amount
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {buyingLogs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">
                        {log.quantity} A4 pages
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {log.combo || "No Combo"}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        đ{log.totalAmount}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div> */}

      {/* Responsive Order History Table */}
      <div className="order-history-section col-span-full mt-10">
        <Typography variant="h4" color="black" className="mb-4">
          Order History
        </Typography>
        <Card className="bg-[#f4f4f4] p-5 shadow-md">
          {isLogsLoading ? (
            <Typography>Loading...</Typography>
          ) : buyingLogs.length === 0 ? (
            <Typography>No order history found.</Typography>
          ) : (
            <div className="overflow-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-200 text-left text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-200 px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Combo</th>
                    <th className="border border-gray-200 px-4 py-2">
                      Total Amount
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {buyingLogs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">
                        {log.quantity} A4 pages
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {log.combo || "No Combo"}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        đ{log.totalAmount}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BuyPaper;
